import Login from "../../components/Login";
import * as S from "./styles";

export default function NotLogged() {
  return (
    <S.Container>
      <S.Title>Bem vindo!</S.Title>
      <S.Body>
        <h3 style={{ fontWeight: "400" }}>
          Para acessar o conteúdo é necessário estar logado!
        </h3>
        <Login />
      </S.Body>
    </S.Container>
  );
}
