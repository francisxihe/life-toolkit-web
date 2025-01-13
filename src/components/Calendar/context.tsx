import { createInjectState } from '@/utils/createInjectState';
import { useState, useEffect, useMemo } from 'react';
import { CalendarEvent, EventFormData } from './types';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addHours,
} from 'date-fns';
import { api } from './lib/api';

export interface CalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (event: CalendarEvent) => void;
}

export const [CalendarProvider, useCalendarContext] = createInjectState<{
  days: Date[];
  events: CalendarEvent[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalMode: 'create' | 'edit';
  setModalMode: (mode: 'create' | 'edit') => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  getCalendarUrl: () => string;
  handleEditEvent: (event: CalendarEvent) => void;
  handleQuickAdd: (date: Date) => void;
  handleCloseModal: () => void;
  handleDeleteEvent: (id: string) => Promise<void>;
  handleExportEvent: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}>((props: CalendarProps & { children: React.ReactNode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(props.events);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  useEffect(() => {
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

  const onNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const onPrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       if (modalMode === 'create') {
  //         await api.createEvent(formData);
  //       } else if (selectedEvent) {
  //         await api.updateEvent({ ...formData, id: selectedEvent.id });
  //       }
  //       await loadEvents();
  //       handleCloseModal();
  //     } catch (error) {
  //       console.error('Failed to save event:', error);
  //     }
  //   };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
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
  return {
    days,
    events: [],
    currentDate,
    setCurrentDate,
    isModalOpen,
    setIsModalOpen,
    modalMode,
    setModalMode,
    selectedEvent,
    setSelectedEvent,
    getCalendarUrl,
    handleEditEvent,
    handleQuickAdd,
    handleCloseModal,
    handleDeleteEvent,
    handleExportEvent: () => {
      //
    },
    onNextMonth,
    onPrevMonth,
  };
});
