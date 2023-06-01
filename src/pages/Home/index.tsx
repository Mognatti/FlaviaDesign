import styled from "styled-components";
import Login from "../../components/Login";
const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <Section>
      <Login />
    </Section>
  );
}
