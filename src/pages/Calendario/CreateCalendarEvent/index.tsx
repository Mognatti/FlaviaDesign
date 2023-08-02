import { client } from "../../../supabaseClient";
import { Client } from "../../../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createCalendarEvent(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  session: any,
  cliente: string | null,
  clientList: Client[] | undefined,
  procedimento: string | null,
  tel: string | null,
  start: any,
  end: any
) {
  e.preventDefault();

  const event = {
    summary: `${cliente} - ${tel}`,
    description: `
Cliente: ${cliente} 
Prodecimento: ${procedimento}
Telefone: ${tel}
Mensagem de confirmação:
Oii, boa tarde, ${cliente}! 
Tudo bem? 💚
Posso confirmar seu horário de amanhã às ${start.$H}:${
      start.$m > 9 ? start.$m : "00"
    }? ☺️
    
Regas do atendimento: ✨
1- O limite estabelecido de atraso é de 10 minutos, com obrigação de aviso. 
2- Os dias de atendimento são de terça à sexta, com sábado até as 15h 
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
        last_visit: start.toISOString(),
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
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
        alert(
          "Ocorreu algum erro ao criar o evento." + "\n" + data.error.message
        );
      } else {
        alert("Evento criado com Sucesso!");
        window.location.reload();
      }
    })
    .catch((error) =>
      alert(`Falha na criação do evento!\n Motivo: ${error.message}`)
    );
}
