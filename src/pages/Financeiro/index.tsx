import { useState, useEffect } from "react";
import { getClientsFullData } from "../../components/FetchClients";
import { Client } from "../../types";
import dayjs from "dayjs";
import useProcedimentos from "../../hooks/useProcedimentos";
import Loader from "../../components/Loader";
import * as S from "../../styles/GlobalStyles";
import styled from "styled-components";

const WIPTitle = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Financeiro() {
  const [clients, setClients] = useState<Client[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [current] = useState<Client[]>([]);

  const [{ procedimentosList, isLoading }] = useProcedimentos();
  useEffect(() => {
    getClientsFullData(setClients, setLoading);
  }, []);

  clients?.map((client) => {
    if (dayjs(new Date()).month() === dayjs(client.last_visit).month()) {
      if (!current.find((item) => item.id === client.id)) current.push(client);
    }
  });

  const thisMonthSales: number[] = [];

  function sumArr(array: number[]) {
    let sum = 0;
    for (const number of array) {
      sum += number;
    }
    return sum;
  }
  if (loading || isLoading) return <Loader />;
  return (
    <S.Section>
      <WIPTitle>Aguarde a Atualização!</WIPTitle>
    </S.Section>
  );
  //Still WIP
  if (false) {
    return (
      <div>
        <div>
          <h3>Financeiro</h3>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Procedimentos do Mês</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {current.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>
                    {client.services?.map((service) => (
                      <li key={client.cel_number}>{service}</li>
                    ))}
                  </td>
                  {procedimentosList?.map((procedimento) => {
                    if (client.services?.includes(procedimento.name)) {
                      thisMonthSales.push(procedimento.price);
                      return <td key={procedimento.id}>R$ {procedimento.price},00</td>;
                    }
                  })}
                </tr>
              ))}
              <tr>
                <th>Total</th>
                <th>R$ {sumArr(thisMonthSales)},00</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
