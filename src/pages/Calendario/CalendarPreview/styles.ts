import styled from "styled-components";

export const EmbedCalendarBig = styled.div`
  border: none;
  display: inherit;
  @media (max-width: 840px) {
    display: none;
  }
`;

export const EmbedCalendarSmall = styled.div`
  display: none;
  @media (max-width: 840px) {
    display: inherit;
  }
`;
