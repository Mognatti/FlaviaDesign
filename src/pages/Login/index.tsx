import useAuth from "../../hooks/useAuth";
import * as S from "./styles";

export default function LoginPage() {
  const { googleSignIn } = useAuth();

  function handleClick() {
    googleSignIn();
  }
  return (
    <S.Container>
      <S.Title>Bem vindo!</S.Title>
      <S.Body>
        <h3 style={{ fontWeight: "400" }}>Para acessar o conteúdo é necessário estar logado!</h3>
        <S.LoginButton variant="contained" onClick={handleClick}>
          Entrar com o Google
        </S.LoginButton>
      </S.Body>
    </S.Container>
  );
}
