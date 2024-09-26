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
import useProcedimentos from "../../hooks/useProcedimentos";
import CalendarPreview from "./CalendarPreview";
import { DateLib } from "../../types";
import { PuffLoader } from "react-spinners";
import useWindowSize from "../../hooks/useWindowSize";
import Loader from "../../components/Loader";
import useFetchCostumersNameAndPhone from "../../hooks/useFetchCostumersNameAndPhone.ts";

export default function Calendar() {
  const session = useSession();
  const [costumerName, setCostumerName] = useState<string | null>(null);
  const [costumerPhone, setCostumerPhone] = useState<string | null>("");
  const [procedure, setProcedure] = useState<string | null>(null);
  const [additionalProcedure, setAdditionalProcedure] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<DateLib | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { costumersNameAndPhone, isLoadingNameAndPhone } = useFetchCostumersNameAndPhone();
  const [{ procedimentosList, isLoading }] = useProcedimentos();
  const [{ isMobile }] = useWindowSize();

  /**use client name to change client tel input*/
  useEffect(() => {
    const clientNameExist = costumersNameAndPhone?.find((item) => item.name === costumerName);
    if (clientNameExist) setCostumerPhone(clientNameExist.cel_number);
  }, [costumerName, costumersNameAndPhone]);

  /**use client phone to change client name input */
  useEffect(() => {
    const clientTelExist = costumersNameAndPhone?.find((item) => item.cel_number === costumerPhone);
    if (clientTelExist) setCostumerName(clientTelExist.name);
  }, [costumerPhone, costumersNameAndPhone]);

  /**use 'procedimento' and 'startDate' values to change 'endDate' value */
  useEffect(() => {
    if (startDate && procedure) {
      const { $D: startDay, $M: startMonth, $y: startYear, $H: startHour, $m: startMinutes } = startDate;

      const procedimentoItem = procedimentosList.find((item) => item.name === procedure);

      const segundoProcedimentoValue = procedimentosList.find((item) => item.name === additionalProcedure);

      const procedimentoHoras = procedimentoItem?.hours ?? 0;
      const procedimentoMinutos = procedimentoItem?.minutes ?? 0;

      /**Normalize the index, making January be 1 and December be 12 */
      let endDateTime = dayjs(`${startMonth + 1 > 11 ? 0 : startMonth + 1}/${startDay}/${startYear}`);
      if (additionalProcedure && segundoProcedimentoValue) {
        const segundoProcedimentoHoras = segundoProcedimentoValue.hours ?? 0;
        const segundoProcedimentoMinutos = segundoProcedimentoValue.minutes ?? 0;

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
      costumerName,
      costumersNameAndPhone,
      procedure,
      additionalProcedure,
      costumerPhone,
      startDate,
      endDate,
      setIsCreating
    );
  }

  if (isLoadingNameAndPhone || isLoading) return <Loader />;
  return (
    <S.CustomGlobalSection>
      <S.CalendarContainer>
        <S.CalendarForm mobile={isMobile}>
          <GS.Title>Novo Agendamento</GS.Title>
          <Stack spacing={2} style={{ width: "100%" }}>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nome da cliente"
                  onChange={(e: any) => setCostumerName(e.target.value)}
                  required
                />
              )}
              options={costumersNameAndPhone.map((cliente) => cliente.name) || ["Carregando clientes..."]}
              value={costumerName}
              onChange={(_event, newValue) => setCostumerName(newValue)}
              freeSolo
            />
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Telefone da cliente"
                  onChange={(e: any) => setCostumerPhone(e.target.value)}
                  required
                />
              )}
              value={costumerPhone}
              onChange={(_event, newValue) => setCostumerPhone(newValue)}
              options={costumersNameAndPhone.map((cliente) => cliente.cel_number) || ["Carregando telefones"]}
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
              disabled={!procedure || !costumerName || !costumerPhone || !startDate || !endDate}
            >
              {isCreating ? <PuffLoader size={25} color="#c3ccbf" /> : "Salvar no Calendário"}
            </S.StyledButton>
          </Stack>
        </S.CalendarForm>
        <CalendarPreview />
      </S.CalendarContainer>
    </S.CustomGlobalSection>
  );
}
