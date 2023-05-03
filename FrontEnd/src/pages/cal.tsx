// Data and Imports
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from '@emotion/styled';

// --------

// defining scope for fullcalendar style
const FullCalendarContainer = styled.div`
  height: auto;
  padding: 10px;
`;

// configuring the plugins and settings for the calendar element
const options = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  initialView: 'timeGridWeek',
  eventContent: function (arg) {
    const details = arg.event.extendedProps.details;
    const detailsText = details ? details.join('\n') : '';
    return (
      <div title={detailsText}>
        {arg.event.title}
        <br />
      </div>
    );
  },
  // events: events,
  eventBackgroundColor: '#555555',
  eventBorderColor: '#333333',
  slotEventOverlap: false,
  slotLabelFormat: { hour: 'numeric' as const, minute: '2-digit' as const },
  slotDuration: '00:30:00',
  weekNumbers: false,
  views: {
    timeGridWeek: {
      allDaySlot: false,
      slotMinTime: '06:00:00',
      slotMaxTime: '22:00:00',
    },
  },
  dayHeaderFormat: { weekday: 'short' as const },
};

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Cal = () => {
  // fetching usrCart session variable to display data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/get_events', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(response => {
        setData(response.items);
      });
  }, []);

  return (
    <FullCalendarContainer>
      <FullCalendar height={768} {...options} events={data} />
    </FullCalendarContainer>
  );
};

// rendering contents for display
export default Cal;
