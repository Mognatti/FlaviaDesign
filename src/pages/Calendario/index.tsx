import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers/";
import { Link } from "react-router-dom";

export default function Calendar() {
  const session = useSession(); // session data overall, mainly tokens and user info (session ?  user = true : user = false)

  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [cliente, setCliente] = useState("");
  const [descricao, setDescricao] = useState("");
  const [time, setTime] = useState<any>(null);

  async function createCalendarEvent(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const event = {
      summary: cliente,
      description: descricao,
      start: {
        dateTime: start?.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end?.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

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
        console.log(data);
        alert("Evento criado com Sucesso!");
      })
      .catch((error) =>
        alert(`Falha na criação do evento!\n Motivo: ${error}`)
      );
  }

  return (
    <section>
      <div>
        {session ? (
          <div>
            <h2>Olá {session.user.email}</h2>
            <p>Começo do Evento</p>
            <div>
              <DateTimePicker
                value={start}
                showDaysOutsideCurrentMonth
                onChange={(newValue) => setStart(newValue.$d)}
              />
            </div>
            <p>Fim do evento</p>
            <DateTimePicker
              value={end}
              onChange={(newValue) => setEnd(newValue.$d)}
            />
            <p>Teste</p>
            <TimePicker
              value={time}
              onChange={(newValue) => setTime(newValue)}
            />
            <div>
              <input
                type="text"
                value={cliente}
                placeholder="Nome da Cliente"
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={descricao}
                placeholder="Procedimento"
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <hr />
            <button onClick={(e) => createCalendarEvent(e)}>
              Salvar no Calendário
            </button>
            <p></p>
          </div>
        ) : (
          <div>
            Para criar eventos no calendário, faça login na{" "}
            <Link to="/">home</Link>
          </div>
        )}
      </div>
    </section>
  );
}
