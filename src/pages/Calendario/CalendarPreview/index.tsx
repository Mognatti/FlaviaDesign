import { pallete } from "../../../styles/GlobalStyles";
import { CalendarPreviewProps } from "../../../types";
import * as S from "./styles";

export default function CalendarPreview({ emailLink }: CalendarPreviewProps) {
  return (
    <>
      <S.EmbedCalendarBig>
        <iframe
          title="calendario-desktop"
          src={emailLink}
          style={{
            border: `solid 1px ${pallete.lightGreen}`,
            width: "800px",
            height: "600px",
            marginTop: "2%",
            borderRadius: "5px",
          }}
        ></iframe>
      </S.EmbedCalendarBig>
      <S.EmbedCalendarSmall>
        <iframe
          title="calendario-mobile"
          src={emailLink}
          style={{
            border: `solid 1px ${pallete.lightGreen}`,
            width: "90vw",
            height: "600px",
            marginTop: "10%",
            borderRadius: "5px",
          }}
        ></iframe>
      </S.EmbedCalendarSmall>
    </>
  );
}
