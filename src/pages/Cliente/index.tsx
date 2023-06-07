import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { client } from "../../supabaseClient";
import styled from "styled-components";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import NewClient from "./NewClient";

const Title = styled.h3`
  padding: 8px;
  border-bottom: 2px solid rgba(69, 80, 61, 0.4);
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-left: 0;
`;

const Item = styled.li`
  padding: 24px;
`;

const NotLogin = styled.p`
  text-align: center;
  margin-top: 15px;
`;

export default function Clients() {
  const [clients, setClients] = useState<any[]>();
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

  if (session) {
    return (
      <section>
        <NewClient />
        <br />
        <ListContainer>
          <Title>Clientes Cadastados</Title>
          {loading && <p>Carregando clientes...</p>}
          <List>
            {clients?.map((client) => (
              <Item key={client.id}>
                <Card client={client} />
              </Item>
            ))}
          </List>
        </ListContainer>
      </section>
    );
  } else {
    return (
      <NotLogin>
        Para criar acessar o conteúdo da página, faça login na{" "}
        <Link to="/">home</Link>
      </NotLogin>
    );
  }
}
