/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "./Components/Card";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import NewClient from "./Components/NewClient";
import * as S from "./styles";
import * as GS from "../../styles/GlobalStyles";
import { getClientsFullData } from "../../components/FetchClients";
import { Client } from "../../types";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    getClientsFullData(setClients, setLoading);
  }, []);

  const filtredClients = clients?.filter((cliente) =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!session) {
    return (
      <S.NotLoggedin>
        Para criar acessar o conteúdo da página, faça login na{" "}
        <Link to="/">home</Link>
      </S.NotLoggedin>
    );
  }

  if (loading && session) return <S.Loading>Carregando clientes...</S.Loading>;

  return (
    <section>
      <NewClient />
      <br />
      <S.ListContainer>
        <GS.SessionTitle>Clientes Cadastados</GS.SessionTitle>
        <S.SearchDiv>
          <S.SearchIcon />
          <S.Input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></S.Input>
        </S.SearchDiv>
        <S.List>
          {filtredClients?.map((client) => (
            <S.Item key={client.id}>
              <Card client={client} />
            </S.Item>
          ))}
        </S.List>
      </S.ListContainer>
    </section>
  );
}
