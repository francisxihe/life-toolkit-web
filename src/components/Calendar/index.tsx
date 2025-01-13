import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { CalendarProvider } from './Context';
import SearchBar from '../../pages/todo/todo-calendar/SearchBar';
import { CalendarEvent } from './types';
import { CalendarProps } from './Context';

export default function Calendar(props: CalendarProps) {
  return (
    <CalendarProvider {...props}>
      <SearchBar />
      <CalendarHeader />
      <CalendarGrid />
      {/* <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          mode={modalMode}
        /> */}
    </CalendarProvider>
  );
}
