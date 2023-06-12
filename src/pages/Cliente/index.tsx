/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "./Components/Card";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import NewClient from "./Components/NewClient";
import {
  SessionTitle,
  Loading,
  SearchDiv,
  Input,
  SearchIcon,
  ListContainer,
  List,
  Item,
  NotLoggedin,
} from "../../styles/StyledComponenets";
import { getClientsFullData } from "../../components/FetchClients";

export default function Clients() {
  const [clients, setClients] = useState<any[]>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    getClientsFullData(setClients, setLoading);
  }, []);

  const filtredClients = clients?.filter((cliente) =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  return session ? (
    loading ? (
      <Loading>Carregando clientes...</Loading>
    ) : (
      <section>
        <NewClient />
        <br />
        <ListContainer>
          <SessionTitle>Clientes Cadastados</SessionTitle>
          <SearchDiv>
            <SearchIcon />
            <Input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
          </SearchDiv>

          <List>
            {filtredClients?.map((client) => (
              <Item key={client.id}>
                <Card client={client} />
              </Item>
            ))}
          </List>
        </ListContainer>
      </section>
    )
  ) : (
    <NotLoggedin>
      Para criar acessar o conteúdo da página, faça login na{" "}
      <Link to="/">home</Link>
    </NotLoggedin>
  );
}
