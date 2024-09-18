import useWindowSize from "../../../hooks/useWindowSize";
import { breakPointsNumbers } from "../../../styles/GlobalStyles";
import { EmbedCalendar } from "./styles";
export default function CalendarPreview() {
  const [{ windowSize }] = useWindowSize();
  const responsive = {
    desktop: "100%",
    tablet: "650px",
    mobile: "100%",
  };
  function calendarWidth() {
    if (windowSize > breakPointsNumbers.desktop) {
      return responsive.desktop;
    }
    if (windowSize <= breakPointsNumbers.smallTablet) {
      return responsive.mobile;
    }
    return responsive.tablet;
  }

  return (
    <EmbedCalendar
      src={import.meta.env.VITE_NEW_STYLED_CALENDAR_DEV}
      title="Styled Calendar"
      className="styled-calendar-container"
      style={{
        width: calendarWidth(),
        border: "none",
        height: "615px",
      }}
      data-cy="calendar-embed-iframe"
    />
  );
}
