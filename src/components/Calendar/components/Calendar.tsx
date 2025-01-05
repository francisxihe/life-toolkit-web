import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addHours,
} from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import SearchBar from './SearchBar';
import { Event, EventFormData } from '../types';
import { api } from '../lib/api';

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [modalMode, setModalMode] = React.useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [formData, setFormData] = React.useState<EventFormData>({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    color: 'blue',
    description: '',
  });

  React.useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const days = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const filteredEvents = React.useMemo(() => {
    if (!searchQuery) return events;
    const query = searchQuery.toLowerCase();
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.date.includes(query)
    );
  }, [events, searchQuery]);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        await api.createEvent(formData);
      } else if (selectedEvent) {
        await api.updateEvent({ ...formData, id: selectedEvent.id });
      }
      await loadEvents();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setFormData(event);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleQuickAdd = (date: Date) => {
    const startTime = format(new Date().setMinutes(0), 'HH:mm');
    const endTime = format(addHours(new Date().setMinutes(0), 1), 'HH:mm');

    setFormData({
      title: '',
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime,
      color: 'blue',
      description: '',
    });
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      color: 'blue',
      description: '',
    });
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await api.deleteEvent(id);
      await loadEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const getCalendarUrl = () => {
    return 'webcal://localhost:3000/calendar.ics';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onNewEvent={() => {
            setModalMode('create');
            setIsModalOpen(true);
          }}
          calendarUrl={getCalendarUrl()}
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CalendarGrid
          days={days}
          currentDate={currentDate}
          events={filteredEvents}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onQuickAdd={handleQuickAdd}
        />
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
      />
    </div>
  );
}
