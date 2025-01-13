import { createInjectState } from '@/utils/createInjectState';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ApiService from '../service/api';
import { Todo } from '../service/types';

export const [CalendarProvider, useCalendarContext] = createInjectState<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  calendarDate: Dayjs;
  setCalendarDate: (date: Dayjs) => void;
  todoList: Todo[];
}>((props) => {
  const [calendarDate, setCalendarDate] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    ApiService.getTodoList().then((events) => {
      setTodoList(events);
    });
  }, []);

  return {
    todoList,
    searchQuery,
    setSearchQuery,
    calendarDate,
    setCalendarDate,
  };
});
