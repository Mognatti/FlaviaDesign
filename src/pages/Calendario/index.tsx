/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/";
import { Autocomplete, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { procedimentosNome } from "../../components/Procedimentos";
import { Form, Container } from "../../components/StyledComponents";
import styled from "styled-components";
import { styled as styledMui } from "@mui/material";
import { createCalendarEvent } from "./CreateCalendarEvent";
import { client } from "../../supabaseClient";

const Title = styled.h3`
  padding: 8px;
  padding-bottom: 16px;
  font-weight: 400;
`;

const Loading = styled.p`
  text-align: center;
  margin-top: 15px;
`;
const P = styled.p``;

const StyledButton = styledMui(Button)`
  background-color: gray;
`;

export default function Calendar() {
  const session = useSession(); // session data overall, mainly tokens and user info (session ?  user = true : user = false)
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [cliente, setCliente] = useState<string | null>(null);
  const [tel, setTel] = useState("");
  const [descricao, setDescricao] = useState<string | null>(null);
  const [clientList, setClientList] = useState<any[]>();
  const [loading, setLoading] = useState(false);

  async function getClientsName() {
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
    getClientsName();
  }, []);

  useEffect(() => {
    const existentClient = clientList?.find((item) => item.name === cliente);
    existentClient ? setTel(existentClient.cel_number) : setTel("");
  }, [cliente, clientList]);

  function setDate(newValue: any) {
    setStart(newValue);
    const startDay = start.$D;
    const startMonth = start.$M;
    const startYear = start.$y;
    setEnd(
      dayjs(
        `${
          startMonth == startMonth + 1 > 11 ? 0 : startMonth + 1
        }/${startDay}/${startYear}`
      )
    );
  }
  console.log(descricao);
  return (
    <section>
      <div>
        {session ? (
          loading ? (
            <Loading>Carregando Clientes...</Loading>
          ) : (
            <Container>
              <Form>
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
                        onBlur={(e: any) => setDescricao(e.target.value)}
                        required
                      />
                    )}
                    options={procedimentosNome}
                    value={descricao}
                    onChange={(_event, newValue) => setDescricao(newValue)}
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
                  <P>Início do atedimento:</P>
                  <div>
                    <DateTimePicker
                      value={start}
                      showDaysOutsideCurrentMonth
                      onChange={(newValue) => setDate(newValue)}
                    />
                  </div>
                  <P>Fim do atendimento:</P>
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
                        descricao,
                        tel,
                        start,
                        end
                      )
                    }
                    disabled={
                      descricao === null ||
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
              </Form>
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
            </Container>
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
