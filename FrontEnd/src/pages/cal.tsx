// Data and Imports
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// --------

// static demo sample json
// const events = [
//   {
//     title: 'PHYS 201',
//     start: '2023-04-24T10:00:00',
//     end: '2023-04-24T12:00:00',
//     details: [
//       'Physics II\n',
//       'Workman Hall\n',
//       '10:00am - 12:00pm\n',
//       'Main Campus\n',
//       'Instructor Name',
//     ],
//   },
//   {
//     title: 'IT 101',
//     start: '2023-04-25T10:00:00',
//     end: '2023-04-25T11:30:00',
//     details: [
//       'Intro to IT\n',
//       'Cramer Hall\n',
//       '10:00am - 11:30am\n',
//       'Main Campus\n',
//       'Instructor Name',
//     ],
//   },
//   {
//     title: 'PHIL 101',
//     start: '2023-04-25T12:30:00',
//     end: '2023-04-25T13:30:00',
//     details: [
//       'Intro to Philosophy\n',
//       'Jones Hall\n',
//       '12:30am - 1:30pm\n',
//       'Main Campus\n',
//       'Instructor Name',
//     ],
//   },
// ];

// --------

// configuring the plugins and settings for the calendar element
const options = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek',
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
  eventBackgroundColor: '#BBBBBB',
  eventBorderColor: '#666666',
  eventMargin: 25,
  slotEventOverlap: false,
  slotLabelFormat: { hour: 'numeric', minute: '2-digit' },
  slotDuration: '00:30:00',
  weekNumbers: true,
  views: {
    timeGridWeek: {
      allDaySlot: false,
      slotMinTime: '06:00:00',
      slotMaxTime: '22:00:00',
    },
  },
};

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Cal = () => {
  // fetching usrCart session variable to display data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/http://localhost:5000/api/get_events')
      .then(response => response.json())
      .then(response => {
        setData(response.items);
      });
  }, []);

  return (
    <div style={{ height: 'auto', padding: '10px' }}>
      <FullCalendar height={768} {...options} events={data} />
    </div>
  );
};

// rendering contents for display
export default Cal;
