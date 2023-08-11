import { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Calendars() {

  const [value, onChange] = useState(new Date());
  const [calendVis, setCalenVis] = useState(false)

  const handleCVis = () => {
    setCalenVis(!calendVis);
  }

  return (
    <div>
      {/* if value causes errors, replace with Calendar in div below*/}
      <div onClick={handleCVis}>{value.toLocaleDateString()}</div>
      {calendVis && <Calendar onChange={onChange} value={value} />}
      {console.log(value)}
    </div>
  );
}

export default Calendars;