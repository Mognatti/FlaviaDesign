/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/";
import { Autocomplete, Stack } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import dayjs, { Dayjs } from "dayjs";
import * as GS from "../../styles/GlobalStyles";
import * as S from "./styles";
import { createCalendarEvent } from "./CreateCalendarEvent";
import { getClientsNameAndCell } from "../../components/FetchClients";
import useProcedimentos from "../../hooks/useProcedimentos";
import CalendarPreview from "./CalendarPreview";
import { Client, DateLib } from "../../types";
import { PuffLoader } from "react-spinners";
import useWindowSize from "../../hooks/useWindowSize";
import Loader from "../../components/Loader";

export default function Calendar() {
  const session = useSession();
  const [clientName, setClientName] = useState<string | null>(null);
  const [clientPhone, setClientPhone] = useState<string | null>("");
  const [procedure, setProcedure] = useState<string | null>(null);
  const [additionalProcedure, setAdditionalProcedure] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<DateLib | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();
  const [clientList, setClientList] = useState<Client[]>();
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [{ procedimentosList, isLoading }] = useProcedimentos();
  const [{ isMobile }] = useWindowSize();

  useEffect(() => {
    getClientsNameAndCell(setLoading, setClientList);
  }, []);

  /**use client name to change client tel input*/
  useEffect(() => {
    const clientNameExist = clientList?.find((item) => item.name === clientName);
    if (clientNameExist) setClientPhone(clientNameExist.cel_number);
  }, [clientName, clientList]);

  /**use client tel to change client name input */
  useEffect(() => {
    const clientTelExist = clientList?.find((item) => item.cel_number === clientPhone);
    if (clientTelExist) setClientName(clientTelExist.name);
  }, [clientPhone, clientList]);

  /**use 'procedimento' and 'start' values to change 'end' value */
  useEffect(() => {
    if (startDate && procedure) {
      const { $D: startDay, $M: startMonth, $y: startYear, $H: startHour, $m: startMinutes } = startDate;

      const procedimentoItem = procedimentosList.find((item) => item.name === procedure);

      const segundoProcedimentoItem = procedimentosList.find((item) => item.name === additionalProcedure);

      const procedimentoHoras = procedimentoItem?.hours ?? 0;
      const procedimentoMinutos = procedimentoItem?.minutes ?? 0;

      /**Normalize the index, making January be 1 and December be 12 */
      let endDateTime = dayjs(`${startMonth + 1 > 11 ? 0 : startMonth + 1}/${startDay}/${startYear}`);

      if (additionalProcedure && segundoProcedimentoItem) {
        const segundoProcedimentoHoras = segundoProcedimentoItem.hours ?? 0;
        const segundoProcedimentoMinutos = segundoProcedimentoItem.minutes ?? 0;

        endDateTime = endDateTime
          .add(startHour + procedimentoHoras, "hour")
          .add(startMinutes + procedimentoMinutos, "minute")
          .add(segundoProcedimentoHoras, "hour")
          .add(segundoProcedimentoMinutos, "minute");
      } else {
        endDateTime = endDateTime
          .add(startHour + procedimentoHoras, "hour")
          .add(startMinutes + procedimentoMinutos, "minute");
      }

      setEndDate(endDateTime);
    }
  }, [startDate, procedure, additionalProcedure, procedimentosList]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    createCalendarEvent(
      session,
      clientName,
      clientList,
      procedure,
      additionalProcedure,
      clientPhone,
      startDate,
      endDate,
      setIsCreating
    );
  }

  if (loading || isLoading) return <Loader />;
  return (
    <GS.Section>
      <S.CalendarContainer>
        <S.CalendarForm mobile={isMobile}>
          <GS.Title>Novo Agendamento</GS.Title>
          <Stack spacing={2} style={{ width: "100%" }}>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nome da cliente"
                  onChange={(e: any) => setClientName(e.target.value)}
                  required
                />
              )}
              options={clientList?.map((cliente) => cliente.name) || ["Carregando clientes..."]}
              value={clientName}
              onChange={(_event, newValue) => setClientName(newValue)}
              freeSolo
            />
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Telefone da cliente"
                  onChange={(e: any) => setClientPhone(e.target.value)}
                  required
                />
              )}
              value={clientPhone}
              onChange={(_event, newValue) => setClientPhone(newValue)}
              options={clientList?.map((cliente) => cliente.cel_number) || ["Carregando telefones"]}
              freeSolo
            />
            <S.SelectServiceDiv>
              <Autocomplete
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Primeiro Procedimento"
                    onBlur={(e: any) => setProcedure(e.target.value)}
                    required
                  />
                )}
                options={procedimentosList?.map((procedimento) => procedimento.name) || ["Carregando procedimentos..."]}
                value={procedure}
                onChange={(_event, newValue) => setProcedure(newValue)}
                id="procedimento-input"
                freeSolo
              />
              <Autocomplete
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Segundo Procedimento"
                    onBlur={(e: any) => setAdditionalProcedure(e.target.value)}
                  />
                )}
                options={procedimentosList?.map((procedimento) => procedimento.name) || ["Carregando procedimentos..."]}
                value={procedure ? additionalProcedure : ""}
                onChange={(_event, newValue) => setAdditionalProcedure(newValue)}
                id="procedimento2-input"
                disabled={!procedure}
                freeSolo
              />
            </S.SelectServiceDiv>
            <p>Início do atedimento:</p>
            <DateTimePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} />
            <p>Fim do atendimento:</p>
            <DateTimePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} />
            <S.StyledButton
              className="botao"
              variant="contained"
              color="primary"
              onClick={(e) => handleClick(e)}
              disabled={!procedure || !clientName || !clientPhone || !startDate || !endDate}
            >
              {isCreating ? <PuffLoader size={25} color="#c3ccbf" /> : "Salvar no Calendário"}
            </S.StyledButton>
          </Stack>
        </S.CalendarForm>
        <CalendarPreview />
      </S.CalendarContainer>
    </GS.Section>
  );
}
