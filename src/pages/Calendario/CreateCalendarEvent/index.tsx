import { client } from "../../../supabaseClient";
import { Client } from "../../../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createCalendarEvent(
  session: any,
  cliente: string | null,
  clientList: Client[] | undefined,
  procedimento: string | null,
  segundoProcedimento: string | null,
  tel: string | null,
  start: any,
  end: any,
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsCreating(true);
  const event = {
    summary: `${cliente} - ${tel}`,
    description: `
Cliente: ${cliente} 
Prodecimento: ${
      segundoProcedimento
        ? `${segundoProcedimento}e ${procedimento}`
        : `${procedimento}`
    } 
Telefone: ${tel}
Mensagem de confirmação:
Oii, boa tarde, ${cliente}! 
Tudo bem? 💚
Posso confirmar seu horário de amanhã às ${start.$H}:${
      start.$m > 9 ? start.$m : "00"
    }? ☺️
  
    Regas do atendimento: ✨
    1- O limite estabelecido de atraso é de 10 minutos, com obrigação de aviso. 
    2- os dias de atendimento são de terça a sexta dás 09h às 18h e no sábado dás 09h às 16h
    3- Não trabalho com fiado, aceito cartão de crédito/débito, pix e dinheiro. 
    4- Em caso de falta sem  aviso com antecedência, será necessário um sinal de 50% do valor do procedimento para o próximo agendamento.
    
    Agradeço a compreensão 😘
    `,
    start: {
      dateTime: start?.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: end?.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  if (clientList?.find((client) => client.name === cliente) == undefined) {
    try {
      const { error } = await client.from("Clientes").insert({
        name: cliente,
        cel_number: tel,
        last_service: procedimento,
        services: segundoProcedimento
          ? [procedimento, segundoProcedimento]
          : [procedimento],
        last_visit: start.toISOString(),
      });
      if (error) throw error;
    } catch (error: any) {
      setIsCreating(false);
      alert("Falha na atualização do banco de dados:" + " " + error.message);
    }
  } else {
    try {
      const clienteAtual = clientList?.find(
        (client) => client.name === cliente
      );
      const clienteId = clienteAtual?.id;
      const { error } = await client
        .from("Clientes")
        .update({
          last_service: procedimento,
          services: segundoProcedimento
            ? [procedimento, segundoProcedimento]
            : [procedimento],
          last_visit: start.toISOString(),
        })
        .eq("id", clienteId);
      if (error) throw error;
    } catch (error: any) {
      alert("Falha na atualização do banco de dados:" + " " + error.message);
    }
  }

  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.provider_token,
      },
      body: JSON.stringify(event),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status !== "confirmed") {
        setIsCreating(false);
        alert(
          "Ocorreu algum erro ao criar o evento." + "\n" + data.error.message
        );
      } else {
        setIsCreating(false);
        alert("Evento criado com Sucesso!");
        window.location.reload();
      }
    })
    .catch((error) => {
      setIsCreating(false);
      alert(`Falha na criação do evento!\n Motivo: ${error.message}`);
    });
}
