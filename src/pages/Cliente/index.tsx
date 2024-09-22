/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "./Components/Card";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import NewClient from "./Components/NewClient";
import * as S from "./styles";
import * as GS from "../../styles/GlobalStyles";
import { getCostumersFullData } from "../../components/FetchClients";
import { Costumer } from "../../types";
import Loader from "../../components/Loader";

export default function Clients() {
  const [costumers, setCostumers] = useState<Costumer[]>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    getCostumersFullData(setCostumers, setLoading);
  }, []);

  const filteredCostumers = costumers?.filter((cliente) => cliente.name.toLowerCase().includes(search.toLowerCase()));

  if (loading && session) return <Loader />;

  return (
    <GS.Section>
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
          />
        </S.SearchDiv>
        <GS.List>
          {filteredCostumers?.map((costumer) => (
            <GS.Item key={costumer.id}>
              <Card costumer={costumer} />
            </GS.Item>
          ))}
        </GS.List>
      </S.ListContainer>
    </GS.Section>
  );
}
