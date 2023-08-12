'use client'
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { Calendar, DayValue } from '@amir04lm26/react-modern-calendar-date-picker';
import { useState } from 'react';
import { useModalState } from './context/ModalStateContext';

type CalendarDateProps = {
  startEndDate: string;
};

const CalendarDate: React.FC<CalendarDateProps> = ({ startEndDate }) => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(dateToObj(startEndDate));

  const { isAddOpen, isCancelOpen } = useModalState();

  function dateToObj(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return { year, month, day };
  }

  return (!isAddOpen && !isCancelOpen) ? (
    <div className="mt-3 px-3 flex flex-col items-center">
      <Calendar
        calendarClassName="responsive-calendar"
        value={selectedDay}
        onChange={setSelectedDay}
        colorPrimary="#FF5A60C4"
        colorPrimaryLight="#F4CFCD"
      />
    </div>
  ) : null;
};

export default CalendarDate;
