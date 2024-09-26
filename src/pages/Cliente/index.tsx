/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@supabase/auth-helpers-react";
import * as S from "./styles";
import * as GS from "../../styles/GlobalStyles";
import Loader from "../../components/Loader";
import ClientTable from "./Components/ClientTable";
import useFetchCostumers from "../../hooks/useFetchCostumers";

export default function Clients() {
  const session = useSession();
  const { costumers, isCostumerDBLoading } = useFetchCostumers();

  if (isCostumerDBLoading && session) return <Loader />;

  return (
    <GS.Section>
      <ClientTable costumers={costumers} />
    </GS.Section>
  );
}
