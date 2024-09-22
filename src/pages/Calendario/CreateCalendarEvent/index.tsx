import { Session } from "@supabase/supabase-js";
import { client } from "../../../supabaseClient";
import { Costumer, DateLib } from "../../../types";
import dayjs from "dayjs";

type Event = {
  summary: string;
  description: string;
  start: {
    dateTime: any;
    timeZone: string;
  };
  end: {
    dateTime: any;
    timeZone: string;
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createCalendarEvent(
  session: Session | null,
  clientName: string | null,
  clientList: Costumer[] | undefined,
  procedure: string | null,
  secondProcedure: string | null,
  clientPhone: string | null,
  startDate: DateLib | null | undefined,
  endDate: dayjs.Dayjs | null | undefined,
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsCreating(true);

  const event: Event = {
    summary: `${clientName} - ${clientPhone}`,
    description: `
Cliente: ${clientName} 
Prodecimento: ${secondProcedure ? `${secondProcedure}e ${procedure}` : `${procedure}`} 
Telefone: ${clientPhone}
Mensagem de confirmação:
      
Oii, boa tarde, ${clientName}! 
Tudo bem? 💚
Posso confirmar seu horário de amanhã às ${startDate!.$H}:${startDate!.$m > 9 ? startDate!.$m : "00"}? ☺️

Regas do atendimento: ✨
1- O limite estabelecido de atraso é de 10 minutos, com obrigação de aviso. 
2- os dias de atendimento são de terça a sexta dás 09h às 18h e no sábado dás 09h às 16h
3- Não trabalho com fiado, aceito cartão de crédito/débito, pix e dinheiro. 
4- Em caso de falta sem  aviso com antecedência, será necessário um sinal de 50% do valor do procedimento para o próximo agendamento.

Agradeço a compreensão 😘
`,

    start: {
      dateTime: startDate?.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: endDate?.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  const currentClient = clientList?.find((client) => client.name === clientName);

  if (currentClient == undefined && startDate) {
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
      alert("Falha na atualização do banco de dados:" + " " + error.message);
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
      if (error) throw error;
    } catch (error: any) {
      alert("Falha na atualização do banco de dados:" + " " + error.message);
    }
  }

  await updateGoogleCalendar({ session, setIsCreating, event });
}

type UpdateGoogleCalendar = {
  session: Session | null;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
};
async function updateGoogleCalendar({ session, setIsCreating, event }: UpdateGoogleCalendar) {
  await fetch(import.meta.env.VITE_GOOGLE_CALENDAR_API_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.provider_token,
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
        alert("Evento criado com Sucesso!");
        window.location.reload();
      }
    })
    .catch((error) => {
      setIsCreating(false);
      alert(`Falha na criação do evento! \nMotivo: ${error.message}`);
    });
}
