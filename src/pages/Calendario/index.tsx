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
} from "../../styles/StyledComponenets";
import { createCalendarEvent } from "./CreateCalendarEvent";
import { getProcedimentos } from "../../components/Procedimentos/listaProcedimentos";
import { client } from "../../supabaseClient";

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

  async function getClientsData() {
    try {
      setLoading(true);
      const { data, error } = await client
        .from("Clientes")
        .select("name, cel_number");
      if (error) throw error;
      if (data != null) setClientList(data);
      setLoading(false);
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getClientsData();
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
      const startDay = start.$D;
      const startMonth = start.$M;
      const startYear = start.$y;
      const procedimentoAtualHoras = procedimentos?.find(
        (item) => item.name == procedimento
      ).hours;
      const procedimentoAtualMinutos = procedimentos?.find(
        (item) => item.name == procedimento
      ).minutes;

      setEnd(
        dayjs(
          `${startMonth + 1 > 11 ? 0 : startMonth + 1}/${startDay}/${startYear}`
        )
          .hour(start.$H + procedimentoAtualHoras)
          .minute(start.$m + procedimentoAtualMinutos)
      );
    }
  }, [start, procedimento, procedimentos]);

  return (
    <section>
      <div>
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
                      procedimentos?.map(
                        (procedimento) => procedimento.name
                      ) || ["Carregando procedimentos..."]
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
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23b5ca9a&ctz=America%2FSao_Paulo&showTitle=0&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showNav=1&src=Y2Fpb2NzbTk3QGdtYWlsLmNvbQ&src=ZmFtaWx5MDg1MTM5MTA3NjgzMTkwODc5NTdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%234285F4&color=%23009688&color=%237986CB"
                style={{
                  border: "solid 1px #777",
                  width: "800px",
                  height: "600px",
                  marginTop: "2%",
                  borderRadius: "5px",
                }}
              ></iframe>
            </CalendarContainer>
          )
        ) : (
          <Loading>
            Para criar eventos no calendário, faça login na{" "}
            <Link to="/">página inicial</Link>
          </Loading>
        )}
      </div>
    </section>
  );
}
