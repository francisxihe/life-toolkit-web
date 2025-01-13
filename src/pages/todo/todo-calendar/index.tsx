import { Calendar } from '@arco-design/web-react';
import SearchBar from './SearchBar';
import { CalendarProvider } from './context';
import CalendarCell from './CalendarCell';
import { useCalendarContext } from './context';

function CalendarPage() {
  const { calendarDate, setCalendarDate } = useCalendarContext();

  return (
    <div className="bg-bg-2 rounded-lg w-full max-h-full">
      <SearchBar />
      <Calendar
        className="!border-none"
        defaultValue={calendarDate}
        value={calendarDate}
        headerType="select"
        dateRender={(currentDate) => <CalendarCell cellDate={currentDate} />}
      />
    </div>
  );
}

export default function CalendarPageLayout() {
  return (
    <CalendarProvider>
      <CalendarPage />
    </CalendarProvider>
  );
}
