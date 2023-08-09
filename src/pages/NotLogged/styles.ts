import styled from "styled-components";
import { breakPoints } from "../../styles/GlobalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10vh;
`;

export const Title = styled.h1`
  padding: 8px;
  margin-bottom: 32px;
  border-bottom: 2px solid rgba(69, 80, 61, 0.4);
  text-align: center;
  @media (max-width: ${breakPoints.mobile}) {
    text-align: center;
    margin-bottom: 32px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakPoints.tablet}) {
    padding: 16px;
    padding-top: 0;
    text-align: center;
    gap: 16px;
    display: flex;
    flex-direction: column;
  }
`;
