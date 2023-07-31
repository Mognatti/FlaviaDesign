/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/";
import { Autocomplete, Stack } from "@mui/material";
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
} from "../../styles/GlobalStyles";
import { createCalendarEvent } from "./CreateCalendarEvent";
import { getClientsNameAndCell } from "../../components/FetchClients";
import useProcedimentos from "./CreateCalendarEvent/useProcedimentos";

export default function Calendar() {
  const session = useSession();
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [cliente, setCliente] = useState<string | null>(null);
  const [tel, setTel] = useState<string>("");
  const [procedimento, setProcedimento] = useState<string | null>(null);
  const [clientList, setClientList] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [emailLink, setEmailLink] = useState("");
  const [{ procedimentosList }] = useProcedimentos();

  useEffect(() => {
    getClientsNameAndCell(setLoading, setClientList);
  }, []);

  //use client name to change client tel input
  useEffect(() => {
    const clientNameExist = clientList?.find((item) => item.name === cliente);
    clientNameExist
      ? setTel(clientNameExist.cel_number)
      : console.log("cliente não encontrado");
  }, [cliente, clientList]);

  //use client tel to change client name input
  useEffect(() => {
    const clientTelExist = clientList?.find((item) => item.cel_number === tel);
    clientTelExist
      ? setCliente(clientTelExist.name)
      : console.log("cliente não encontrado");
  }, [tel, clientList]);

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

      const procedimentoAtualHoras = procedimentosList?.find(
        (item) => item.name == procedimento
      ).hours;
      const procedimentoAtualMinutos = procedimentosList?.find(
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
  }, [start, procedimento, procedimentosList]);

  useEffect(() => {
    if (session?.user.email === import.meta.env.VITE_ADMIN_EMAIL) {
      setEmailLink(import.meta.env.VITE_ADMIN_CALENDAR);
    } else if (session?.user.email === import.meta.env.VITE_DEV_EMAIL) {
      setEmailLink(import.meta.env.VITE_DEV_CALENDAR);
    }
  }, [session]);

  if (loading) return <Loading>Carregando calendário...</Loading>;
  return (
    <section>
      {session ? (
        <CalendarContainer>
          <CalendarForm>
            <Title>Novo Agendamento</Title>
            <Stack spacing={2}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nome"
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
                  <TextField {...params} label="Telefone" required />
                )}
                value={tel}
                onChange={(_event, newValue) => setTel(newValue)}
                options={
                  clientList?.map((cliente) => cliente.cel_number) || [
                    "Carregando telefones",
                  ]
                }
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
                  procedimentosList?.map(
                    (procedimento) => procedimento.name
                  ) || ["Carregando procedimentos..."]
                }
                value={procedimento}
                onChange={(_event, newValue) => setProcedimento(newValue)}
                freeSolo
              />
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
                disabled={!procedimento || !cliente || !tel || !start || !end}
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
      ) : (
        <Loading>
          Para criar eventos no calendário, faça login na{" "}
          <Link to="/">página inicial</Link>
        </Loading>
      )}
    </section>
  );
}
