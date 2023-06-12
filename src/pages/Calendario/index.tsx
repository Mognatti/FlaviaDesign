/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/";
import { Autocomplete, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  CalendarForm,
  CalendarContainer,
  Loading,
  Title,
  StyledButton,
  EmbedCalendarBig,
  EmbedCalendarSmall,
} from "../../styles/StyledComponenets";
import { createCalendarEvent } from "./CreateCalendarEvent";
import { getProcedimentos } from "../../components/Procedimentos/listaProcedimentos";
import { getClientsNameAndCell } from "../../components/FetchClients";

export default function Calendar() {
  const session = useSession(); // session data overall, mainly tokens and user info (session ?  user = true : user = false)
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [cliente, setCliente] = useState<string | null>(null);
  const [tel, setTel] = useState("");
  const [procedimento, setProcedimento] = useState<string | null>(null);
  const [clientList, setClientList] = useState<any[]>();
  const [procedimentos, setProcedimentos] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [emailLink, setEmailLink] = useState("");

  console.log(session);
  //get data from supabase
  useEffect(() => {
    getClientsNameAndCell(setLoading, setClientList);
    getProcedimentos(setProcedimentos);
  }, []);

  //use client name to change tel value
  useEffect(() => {
    const existentClient = clientList?.find((item) => item.name === cliente);
    existentClient ? setTel(existentClient.cel_number) : setTel(tel);
  }, [cliente, clientList]);

  //use 'procedimento' and 'start' values to change 'end' value
  useEffect(() => {
    if (start && procedimento) {
      const {
        $D: startDay,
        $M: startMonth,
        $y: startYear,
        $H: startHour,
        $m: startMinutes,
      } = start;

      const procedimentoAtualHoras = procedimentos?.find(
        (item) => item.name == procedimento
      ).hours;
      const procedimentoAtualMinutos = procedimentos?.find(
        (item) => item.name == procedimento
      ).minutes;

      const formattedDate = `${
        startMonth + 1 > 11 ? 0 : startMonth + 1
      }/${startDay}/${startYear}`;

      setEnd(
        dayjs(formattedDate)
          .hour(startHour + procedimentoAtualHoras)
          .minute(startMinutes + procedimentoAtualMinutos)
      );
    }
  }, [start, procedimento, procedimentos]);

  useEffect(() => {
    if (session?.user.email === "flaviacaparelli98@gmail.com") {
      setEmailLink(
        "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23a6b890&ctz=America%2FSao_Paulo&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=ZmxhdmlhY2FwYXJlbGxpOThAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MDg1MTM5MTA3NjgzMTkwODc5NTdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=cHQtYnIuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB&color=%2333B679&color=%23009688&color=%230B8043&color=%230B8043"
      );
    } else if (session?.user.email === "caiocsm97@gmail.com") {
      setEmailLink(
        "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23b3ca93&ctz=America%2FSao_Paulo&showTitle=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0&src=Y2Fpb2NzbTk3QGdtYWlsLmNvbQ&src=ZmFtaWx5MDg1MTM5MTA3NjgzMTkwODc5NTdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%234285F4&color=%23009688&color=%237986CB"
      );
    }
  }, [session]);

  return (
    <section>
      {session ? (
        loading ? (
          <Loading>Carregando Clientes...</Loading>
        ) : (
          <CalendarContainer>
            <CalendarForm>
              <Title>Novo Agendamento</Title>
              <Stack spacing={2}>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nome da cliente"
                      onBlur={(e: any) => setCliente(e.target.value)}
                      required
                    />
                  )}
                  options={
                    clientList?.map((cliente) => cliente.name) || [
                      "Carregando clientes...",
                    ]
                  }
                  value={cliente}
                  onChange={(_event, newValue) => setCliente(newValue)}
                  freeSolo
                />
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Procedimento"
                      onBlur={(e: any) => setProcedimento(e.target.value)}
                      required
                    />
                  )}
                  options={
                    procedimentos?.map((procedimento) => procedimento.name) || [
                      "Carregando procedimentos...",
                    ]
                  }
                  value={procedimento}
                  onChange={(_event, newValue) => setProcedimento(newValue)}
                  freeSolo
                />
                <TextField
                  label="Telefone"
                  type="tel"
                  inputProps={{ inputMode: "tel" }}
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                ></TextField>
                <p>Início do atedimento:</p>
                <div>
                  <DateTimePicker
                    value={start}
                    onChange={(newValue) => setStart(newValue)}
                  />
                </div>
                <p>Fim do atendimento:</p>
                <DateTimePicker
                  value={end}
                  onChange={(newValue) => setEnd(newValue)}
                />

                <StyledButton
                  className="botao"
                  variant="contained"
                  onClick={(e) =>
                    createCalendarEvent(
                      e,
                      session,
                      cliente,
                      clientList,
                      procedimento,
                      tel,
                      start,
                      end
                    )
                  }
                  disabled={
                    procedimento === null ||
                    cliente === null ||
                    cliente === "" ||
                    tel === "" ||
                    start === null ||
                    end === null
                  }
                >
                  Salvar no Calendário
                </StyledButton>
              </Stack>
            </CalendarForm>
            <EmbedCalendarBig>
              <iframe
                src={emailLink}
                style={{
                  border: "solid 1px #777",
                  width: "800px",
                  height: "600px",
                  marginTop: "2%",
                  borderRadius: "5px",
                }}
              ></iframe>
            </EmbedCalendarBig>
            <EmbedCalendarSmall>
              <iframe
                src={emailLink}
                style={{
                  border: "solid 1px #777",
                  width: "350px",
                  height: "600px",
                  marginTop: "10%",
                  borderRadius: "5px",
                }}
              ></iframe>
            </EmbedCalendarSmall>
          </CalendarContainer>
        )
      ) : (
        <Loading>
          Para criar eventos no calendário, faça login na{" "}
          <Link to="/">página inicial</Link>
        </Loading>
      )}
    </section>
  );
}
