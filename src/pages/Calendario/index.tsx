/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/";
import { Autocomplete, IconButton, Modal, Stack } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import dayjs, { Dayjs } from "dayjs";
import * as S from "./styles";
import useProcedimentos from "../../hooks/useProcedimentos";
import { PuffLoader } from "react-spinners";
import useWindowSize from "../../hooks/useWindowSize";
import Loader from "../../components/Loader";
import useFetchCostumersNameAndPhone from "../../hooks/useFetchCostumersNameAndPhone.ts";
import { DateClickArg } from "@fullcalendar/interaction";
import "./calendar.css";
import { CloseIcon, ModalContent } from "../Cliente/styles.ts";
import useCreateCalendarEvent from "../../hooks/useCreateCalendarEvent.ts";
import DialogComponent from "../../components/Dialog/index.tsx";
import InteractiveCalendar from "./InteractiveCalendar/index.tsx";

export default function Calendar() {
  const session = useSession();
  const [costumerName, setCostumerName] = useState<string | null>(null);
  const [costumerPhone, setCostumerPhone] = useState<string | null>("");
  const [procedure, setProcedure] = useState<string | null>(null);
  const [additionalProcedure, setAdditionalProcedure] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { costumersNameAndPhone, isLoadingNameAndPhone } = useFetchCostumersNameAndPhone();
  const [{ procedimentosList, isLoading }] = useProcedimentos();
  const { createCalendarEvent, message, isCreating } = useCreateCalendarEvent();
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
      const startDay = startDate.get("D");
      const startMonth = startDate.get("M");
      const startYear = startDate.get("year");
      const startHour = startDate.get("hour");
      const startMinutes = startDate.get("m");

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

  function handleOpenModal(info: DateClickArg) {
    setStartDate(dayjs(info.dateStr));
    setShowModal(true);
  }
  async function handleCreateEvent(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    await createCalendarEvent(
      session,
      costumerName,
      costumersNameAndPhone,
      procedure,
      additionalProcedure,
      costumerPhone,
      startDate,
      endDate
    );
  }

  useEffect(() => {
    if (message) {
      setShowDialog(true);
    }
  }, [message]);

  if (isLoadingNameAndPhone || isLoading || !session) return <Loader />;
  return (
    <S.CustomGlobalSection>
      <DialogComponent {...{ showDialog, setShowDialog, message }} />
      <Modal open={showModal}>
        <ModalContent>
          <S.CalendarContainer>
            <S.CalendarForm mobile={isMobile}>
              <Stack sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                <S.ModalTitle>Novo Agendamento</S.ModalTitle>
                <IconButton onClick={() => setShowModal(false)} sx={{ height: "fit-content", alignSelf: "center" }}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Stack spacing={2} style={{ width: "100%" }}>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nome da cliente"
                      color="info"
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
                      color="info"
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
                        color="info"
                        onBlur={(e: any) => setProcedure(e.target.value)}
                        required
                      />
                    )}
                    options={
                      procedimentosList?.map((procedimento) => procedimento.name) || ["Carregando procedimentos..."]
                    }
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
                        color="info"
                        label="Segundo Procedimento"
                        onBlur={(e: any) => setAdditionalProcedure(e.target.value)}
                      />
                    )}
                    options={
                      procedimentosList?.map((procedimento) => procedimento.name) || ["Carregando procedimentos..."]
                    }
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
                  onClick={async (e) => await handleCreateEvent(e)}
                  disabled={!procedure || !costumerName || !costumerPhone || !startDate || !endDate}
                >
                  {isCreating ? <PuffLoader size={25} color="#c3ccbf" /> : "Salvar no Calendário"}
                </S.StyledButton>
              </Stack>
            </S.CalendarForm>
          </S.CalendarContainer>
        </ModalContent>
      </Modal>
      <InteractiveCalendar {...{ handleOpenModal }} />
    </S.CustomGlobalSection>
  );
}
