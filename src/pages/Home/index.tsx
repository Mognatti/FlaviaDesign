import Login, { logout } from "../../components/Login";
import { useSession } from "@supabase/auth-helpers-react";
import * as S from "./styles";
import * as GS from "../../styles/GlobalStyles";
import useFetchClients from "../../hooks/useFetchClients";
import useFetchProcedimentos from "../../hooks/useFetchProcedimentos";
import { useContext } from "react";
import dayjs from "dayjs";
import { SidebarStatusContext } from "../../context/SidebarStatus";
export default function Home() {
  const session = useSession();
  const [{ clients, isClientsLoading }] = useFetchClients();
  const [{ procedimentos, isProcedimentosLoading }] = useFetchProcedimentos();
  const { isOpen } = useContext(SidebarStatusContext);

  function DatesInCurrentWeek(date: string) {
    const currentDate = dayjs();
    const parsedDate = dayjs(date, "YYYY/MM/DD");
    return parsedDate.isSame(currentDate, "week");
  }
  const dateList = clients.map((client) => client.last_visit);

  const datesInCurrentWeek = dateList.filter((date) =>
    DatesInCurrentWeek(date!)
  );
  if (isClientsLoading || isProcedimentosLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Carregando dados...
      </div>
    );
  return session ? (
    <GS.Section sidebar={isOpen}>
      <S.LeftDiv>
        <GS.SessionTitle>Home</GS.SessionTitle>
        <S.List>
          <S.Item>
            <S.ItemTitle>Clientes</S.ItemTitle>
            <S.ItemContent>
              <p>
                <S.ItemData>{clients.length}</S.ItemData> Clientes cadastradas
              </p>
              <p>
                <S.ItemData>{datesInCurrentWeek.length}</S.ItemData> Clientes
                nessa semana
              </p>
            </S.ItemContent>
          </S.Item>
          <S.Item>
            <S.ItemTitle>Procedimentos</S.ItemTitle>
            <div>
              <S.ItemData>{procedimentos.length}</S.ItemData> Procedimentos
              cadastrados
            </div>
          </S.Item>
        </S.List>
      </S.LeftDiv>
      <S.LogoutDiv>
        <S.LogoutButton onClick={() => logout()}>
          Finalizar Sessão
        </S.LogoutButton>
      </S.LogoutDiv>
    </GS.Section>
  ) : (
    <GS.Section>
      <Login />
    </GS.Section>
  );
}
