import { CalendarPreviewProps } from "../../../types";
import * as S from "./styles";

export default function CalendarPreview({ emailLink }: CalendarPreviewProps) {
  return (
    <>
      <S.EmbedCalendarBig>
        <iframe
          src={emailLink}
          style={{
            border: "solid 1px #777",
            width: "800px",
            height: "600px",
            marginTop: "2%",
            borderRadius: "5px",
          }}
        ></iframe>
      </S.EmbedCalendarBig>
      <S.EmbedCalendarSmall>
        <iframe
          src={emailLink}
          style={{
            border: "solid 1px #777",
            width: "350px",
            height: "600px",
            marginTop: "10%",
            borderRadius: "5px",
          }}
        ></iframe>
      </S.EmbedCalendarSmall>
    </>
  );
}
