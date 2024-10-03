import * as S from "./styles";
import * as GS from "../../styles/GlobalStyles";
import useFetchCostumers from "../../hooks/useFetchCostumers";
import useFetchProcedimentos from "../../hooks/useFetchProcedimentos";
import { useContext } from "react";
import dayjs from "dayjs";
import { SidebarStatusContext } from "../../context/SidebarStatus";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const { costumers, isCostumerDBLoading } = useFetchCostumers();
  const [{ procedures, isProceduresLoading }] = useFetchProcedimentos();
  const { isOpen } = useContext(SidebarStatusContext);
  const { logout } = useAuth();

  function DatesInCurrentWeek(date: string) {
    const currentDate = dayjs();
    const parsedDate = dayjs(date, "YYYY/MM/DD");
    return parsedDate.isSame(currentDate, "week");
  }
  const dateList = costumers.map((costumer) => costumer.last_visit);

  const datesInCurrentWeek = dateList.filter((date) => DatesInCurrentWeek(date!));
  if (isCostumerDBLoading || isProceduresLoading) return <Loader />;

  return (
    <GS.Section sidebar={isOpen}>
      <S.LeftDiv>
        <GS.SessionTitle>Home</GS.SessionTitle>
        <S.List>
          <S.Item>
            <S.ItemTitle>Clientes</S.ItemTitle>
            <S.ItemContent>
              <p>
                <S.ItemData>{costumers.length}</S.ItemData> Clientes cadastradas
              </p>
              <p>
                <S.ItemData>{datesInCurrentWeek.length}</S.ItemData> Clientes nessa semana
              </p>
            </S.ItemContent>
          </S.Item>
          <S.Item>
            <S.ItemTitle>Procedimentos</S.ItemTitle>
            <div>
              <S.ItemData>{procedures.length}</S.ItemData> Procedimentos cadastrados
            </div>
          </S.Item>
        </S.List>
      </S.LeftDiv>
      <S.LogoutDiv>
        <S.LogoutButton onClick={() => logout()}>Finalizar Sessão</S.LogoutButton>
      </S.LogoutDiv>
    </GS.Section>
  );
}
