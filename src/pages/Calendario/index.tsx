/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/";
import { Autocomplete, Stack } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import { Link } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import {
  CalendarForm,
  CalendarContainer,
  Loading,
  Title,
  StyledButton,
} from "../../styles/GlobalStyles";
import { createCalendarEvent } from "./CreateCalendarEvent";
import { getClientsNameAndCell } from "../../components/FetchClients";
import useProcedimentos from "./CreateCalendarEvent/useProcedimentos";
import CalendarPreview from "./CalendarPreview";
import { Client, DateLib } from "../../types";

export default function Calendar() {
  const session = useSession();
  const [start, setStart] = useState<DateLib | null>();
  const [end, setEnd] = useState<Dayjs | null>();
  const [cliente, setCliente] = useState<string | null>(null);
  const [tel, setTel] = useState<string | null>("");
  const [procedimento, setProcedimento] = useState<string | null>(null);
  const [clientList, setClientList] = useState<Client[]>();
  const [loading, setLoading] = useState(false);
  const [emailLink, setEmailLink] = useState<string>("");
  const [{ procedimentosList }] = useProcedimentos();

  useEffect(() => {
    getClientsNameAndCell(setLoading, setClientList);
  }, []);

  //use client name to change client tel input
  useEffect(() => {
    const clientNameExist = clientList?.find((item) => item.name === cliente);
    if (clientNameExist) setTel(clientNameExist.cel_number);
  }, [cliente, clientList]);

  //use client tel to change client name input
  useEffect(() => {
    const clientTelExist = clientList?.find((item) => item.cel_number === tel);
    if (clientTelExist) setCliente(clientTelExist.name);
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

      const procedimentoItem = procedimentosList.find(
        (item) => item.name === procedimento
      );

      const procedimentoAtualHoras = procedimentoItem?.hours;
      const procedimentoAtualMinutos = procedimentoItem?.minutes;

      const formattedDate = `${
        startMonth + 1 > 11 ? 0 : startMonth + 1
      }/${startDay}/${startYear}`;

      setEnd(
        dayjs(formattedDate)
          .hour(startHour + procedimentoAtualHoras!)
          .minute(startMinutes + procedimentoAtualMinutos!)
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

  if (!session) {
    return (
      <Loading>
        Para criar eventos no calendário, faça login na{" "}
        <Link to="/">página inicial</Link>
      </Loading>
    );
  }
  if (loading) return <Loading>Carregando calendário...</Loading>;
  return (
    <CalendarContainer>
      <CalendarForm>
        <Title>Novo Agendamento</Title>
        <Stack spacing={2}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nome"
                onChange={(e: any) => setCliente(e.target.value)}
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
                label="Telefone"
                onChange={(e: any) => setTel(e.target.value)}
                required
              />
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
              procedimentosList?.map((procedimento) => procedimento.name) || [
                "Carregando procedimentos...",
              ]
            }
            value={procedimento}
            onChange={(_event, newValue) => setProcedimento(newValue)}
            id="procedimento-input"
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
      <CalendarPreview emailLink={emailLink} />
    </CalendarContainer>
  );
}
