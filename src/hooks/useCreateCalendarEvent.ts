/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session } from "@supabase/supabase-js";
import { client } from "../supabaseClient";
import { Costumer } from "../types";
import dayjs from "dayjs";
import { refreshAccessToken } from "../libs/refreshGoogleToken";
import { useState } from "react";

type Event = {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

type UpdateGoogleCalendar = {
  session: Session | null;
  event: Event;
};

/**
 * Hook que gerencia a criação de eventos no Google Calendar.
 *
 * Retorna um objeto as propriedades:
 * - `createCalendarEvent`: Função que cria um novo evento no Google Calendar com base nos parâmetros passados.
 * - `message`: String que contêm uma mensagem de erro ou sucesso.
 * - `isError`: Booleano que indica se houve algum erro.
 * - `isCreating`: Booleano que indica o loading.
 */
export default function useCreateCalendarEvent() {
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * @description Creates a new event in the logged in user's Google Calendar.
   * @param {Session | null} param.session - The user's session from Supabase.
   * @param {React.Dispatch<React.SetStateAction<boolean>>} param.setIsCreating - A function that sets the state of the "is creating" state.
   * @param {Event} param.event - The event object to be created in the calendar.
   * @returns {Promise<void>}
   */
  async function updateGoogleCalendar({ session, event }: UpdateGoogleCalendar): Promise<void> {
    const newAccessToken = await refreshAccessToken(session);

    await fetch(`${import.meta.env.VITE_GOOGLE_CALENDAR_API_URL}/${session?.user.email}/events`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + newAccessToken,
      },
      body: JSON.stringify(event),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status !== "confirmed") {
          setIsCreating(false);
          alert(`Ocorreu algum erro ao criar o evento: \n${data.error.message}`);
        } else {
          setIsCreating(false);
          setMessage("Evento criado com Sucesso!");
        }
      })
      .catch((error) => {
        setIsCreating(false);
        setMessage(`Falha na criação do evento! \nMotivo: ${error.message}`);
      });
  }

  /**
   * Updates the supabase database and creates a new event in the default Google Calendar of the user's session
   *
   * @param {Session | null} session - The session of the user, required
   * @param {string | null} clientName - The name of the client, required
   * @param {Costumer[] | undefined} clientList - The list of all clients to check if its already in the database
   * @param {string | null} procedure - The name of the first procedure, required
   * @param {string | null} secondProcedure - The name of the second procedure, if it exists
   * @param {string | null} clientPhone - The phone number of the client, required
   * @param {dayjs.Dayjs | null | undefined} startDate - The start date of the event, required
   * @param {dayjs.Dayjs | null | undefined} endDate - The end date of the event, required
   */
  async function createCalendarEvent(
    session: Session | null,
    clientName: string | null,
    clientList: Costumer[] | undefined,
    procedure: string | null,
    secondProcedure: string | null,
    clientPhone: string | null,
    startDate: dayjs.Dayjs | null | undefined,
    endDate: dayjs.Dayjs | null | undefined
  ) {
    setIsCreating(true);
    setMessage("");
    if (!session) {
      setMessage("Login não realizado, faça login novamente para criar o evento!");
      setIsError(true);
      setIsCreating(false);
      return message;
    }

    if (!startDate || !endDate || !procedure || !clientName || !clientPhone) {
      setMessage("Por favor, preencha todos os campos");
      setIsError(true);
      setIsCreating(false);
      return message;
    }

    const event: Event = {
      summary: `${clientName} - ${clientPhone}`,
      description: `
Cliente: ${clientName} 
Prodecimento: ${secondProcedure ? `${secondProcedure}e ${procedure}` : `${procedure}`} 
Telefone: ${clientPhone}
Mensagem de confirmação:
          
Oii, boa tarde, ${clientName}! 
Tudo bem? 💚
Posso confirmar seu horário de amanhã às ${startDate.hour()}:${startDate.minute() > 9 ? startDate.minute() : "00"}? ☺️
    
Regas do atendimento: ✨
1- O limite estabelecido de atraso é de 10 minutos, com obrigação de aviso. 
2- os dias de atendimento são de terça a sexta dás 09h às 18h e no sábado dás 09h às 16h
3- Não trabalho com fiado, aceito cartão de crédito/débito, pix e dinheiro. 
4- Em caso de falta sem  aviso com antecedência, será necessário um sinal de 50% do valor do procedimento para o próximo agendamento.
    
Agradeço a compreensão 😘
    `,

      start: {
        dateTime: startDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const currentClient = clientList?.find((client) => client.name === clientName);

    if (currentClient == undefined) {
      try {
        const { error } = await client.from("Clientes").insert({
          name: clientName,
          cel_number: clientPhone,
          last_service: procedure,
          services: secondProcedure ? [procedure, secondProcedure] : [procedure],
          last_visit: startDate.toISOString(),
        });
        if (error) throw error;
      } catch (error: any) {
        setIsCreating(false);
        setMessage(`Falha na atualização do banco de dados: \n${error.message}`);
      }
    } else if (startDate) {
      try {
        const clienteId = currentClient?.id;
        const { error } = await client
          .from("Clientes")
          .update({
            last_service: procedure,
            services: secondProcedure ? [procedure, secondProcedure] : [procedure],
            last_visit: startDate.toISOString(),
          })
          .eq("id", clienteId);
        if (error) {
          setIsError(true);
          setIsCreating(false);
          throw error;
        }
        await updateGoogleCalendar({ session, event });
      } catch (error: any) {
        setMessage(`Falha na atualização do banco de dados: \n  ${error.message}`);
      }
    }
  }
  return { createCalendarEvent, message, isCreating, isError, isSuccess };
}
