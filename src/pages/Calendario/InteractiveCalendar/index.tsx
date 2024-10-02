import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "../../Login";

type CalendarProps = {
  handleOpenModal: (info: DateClickArg) => void;
};
export default function InteractiveCalendar({ handleOpenModal }: CalendarProps) {
  const [{ isMobile }] = useWindowSize();
  const session = useSession();

  const calendarRef = useRef<FullCalendar | null>(null);
  function handleDateClick(info: DateClickArg) {
    calendarRef.current?.getApi().view.type === "timeGridDay"
      ? handleOpenModal(info)
      : calendarRef.current?.getApi().changeView("timeGridDay", info.date);
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <div style={{ width: "100%", height: "90vh", display: "flex", justifyContent: "center" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        moreLinkText="evento(s)"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: !isMobile ? "dayGridMonth,timeGridWeek,timeGridDay" : "list,timeGridDay",
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Lista",
        }}
        allDayText="Horas"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        titleFormat={{
          year: "numeric",
          month: isMobile ? "2-digit" : "long",
          day: "numeric",
        }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", meridiem: false, hour12: false }}
        dayMaxEvents={3}
        initialView={isMobile ? "list" : "dayGridMonth"}
        views={{
          dayGridMonth: { buttonText: "Mês" },
          timeGridWeek: { buttonText: "Semana" },
          timeGridDay: { buttonText: "Dia" },
          list: { buttonText: "Lista" },
        }}
        slotMinTime={"08:00:00"}
        slotMaxTime={"21:30:00"}
        slotDuration={"00:15:00"}
        weekends={true}
        googleCalendarApiKey={import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY}
        events={{ googleCalendarId: session.user.email, className: "gcal-event" }}
        eventClick={(e) => {
          if (e.event.url) {
            e.jsEvent.preventDefault();
          }
        }}
        locale="pt-br"
        dateClick={(info) => {
          handleDateClick(info);
        }}
      />
    </div>
  );
}
