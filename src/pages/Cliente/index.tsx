/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "./Components/Card";
import { useEffect, useState } from "react";
import { client } from "../../supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import NewClient from "./Components/NewClient";
import {
  SessionTitle,
  Loading,
  Div,
  Input,
  SearchIcon,
  ListContainer,
  List,
  Item,
  NotLoggedin,
} from "../../styles/StyledComponenets";

export default function Clients() {
  const [clients, setClients] = useState<any[]>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const session = useSession();

  async function getClients() {
    try {
      const { data, error } = await client.from("Clientes").select("*");
      if (error) throw error;
      if (data != null) setClients(data);
      setLoading(false);
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getClients();
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
          <Div>
            <SearchIcon size="25" />
            <Input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
          </Div>
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
