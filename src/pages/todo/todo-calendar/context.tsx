import { createInjectState } from '@/utils/createInjectState';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ApiService from '../service/api';
import { Todo } from '../service/types';

export const [CalendarProvider, useCalendarContext] = createInjectState<
  {
    todoList: Todo[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    pageShowDate: Dayjs;
    setPageShowDate: (date: Dayjs) => void;
    move: (date: Dayjs) => void;
    changePageShowDate: (type: 'prev' | 'next', mode: 'month' | 'year') => void;
    calendarMode: 'month' | 'year';
    setCalendarMode: (mode: 'month' | 'year') => void;
    getTodoList: () => Promise<void>;
  },
  Record<string, unknown>
>((props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [pageShowDate, setPageShowDate] = useState(dayjs());
  const [calendarMode, setCalendarMode] = useState<'month' | 'year'>('month');

  function onChangePageDate(time: Dayjs) {
    setPageShowDate(time);
    // onPanelChange && onPanelChange(time);
  }

  function move(time: Dayjs) {
    // setCalendarDate(time);
    // onChange && onChange(time);
    onChangePageDate(time);
  }

  function changePageShowDate(type: 'prev' | 'next', mode: 'month' | 'year') {
    if (type === 'prev') {
      setPageShowDate(dayjs(pageShowDate).subtract(1, mode));
    } else {
      setPageShowDate(dayjs(pageShowDate).add(1, mode));
    }
  }

  const getTodoList = async () => {
    const events = await ApiService.getTodoList();
    setTodoList(events);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return {
    todoList,
    searchQuery,
    setSearchQuery,
    pageShowDate,
    setPageShowDate,
    move,
    changePageShowDate,
    calendarMode,
    setCalendarMode,
    getTodoList,
  };
});
