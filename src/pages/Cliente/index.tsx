/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "./Components/Card";
import { useContext, useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import NewClient from "./Components/NewClient";
import * as S from "./styles";
import * as GS from "../../styles/GlobalStyles";
import { getClientsFullData } from "../../components/FetchClients";
import { Client } from "../../types";
import { SidebarStatusContext } from "../../context/SidebarStatus";
import Loader from "../../components/Loader";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen } = useContext(SidebarStatusContext);
  const session = useSession();

  useEffect(() => {
    getClientsFullData(setClients, setLoading);
  }, []);

  const filtredClients = clients?.filter((cliente) =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && session) return <Loader />;

  return (
    <GS.Section sidebar={isOpen}>
      <br />
      <S.ListContainer>
        <GS.SessionTitle>Clientes</GS.SessionTitle>
        <NewClient />
        <br />
        <S.SearchDiv>
          <S.SearchIcon size="30" />
          <S.Input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></S.Input>
        </S.SearchDiv>
        <GS.List>
          {filtredClients?.map((client) => (
            <GS.Item key={client.id}>
              <Card client={client} />
            </GS.Item>
          ))}
        </GS.List>
      </S.ListContainer>
    </GS.Section>
  );
}
