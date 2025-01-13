import dayjs, { Dayjs } from 'dayjs';
import { useCalendarContext } from './context';
import { Button } from '@arco-design/web-react';

export default function CalendarCell({ cellDate }: { cellDate: Dayjs }) {
  const { setCalendarDate, calendarDate, todoList } = useCalendarContext();

  const getTodoForDay = (day: Dayjs) => {
    return todoList.filter((todo) => dayjs(todo.planDate).isSame(day, 'day'));
  };

  return (
    <div
      className={`w-full h-full hover:bg-fill ${
        calendarDate.isSame(cellDate, 'day') ? 'bg-white' : ''
      }`}
    >
      <div
        onClick={() => setCalendarDate(cellDate)}
        className={`p-1 relative cursor-pointer ${
          cellDate.isBefore(calendarDate, 'month') ||
          cellDate.isAfter(calendarDate, 'month')
            ? 'opacity-50'
            : ''
        }
    `}
      >
        <Button
          type={calendarDate.isSame(cellDate, 'day') ? 'primary' : 'text'}
          className={calendarDate.isSame(cellDate, 'day') ? '' : '!text-text'}
          shape="circle"
          size="mini"
        >
          {cellDate.date()}
        </Button>
        <div className="flex flex-col gap-0.5">
          {getTodoForDay(cellDate).map((todo) => (
            <div
              key={todo.id}
              onClick={(e) => {
                e.stopPropagation();
                // handleEditEvent(event);
              }}
              className={`text-body-1 px-1.5 leading-[20px] rounded-[2px] truncate cursor-pointer ${
                todo.status === 'done'
                  ? 'text-success bg-success-light hover:bg-success-light-hover active:bg-success-light-active'
                  : ''
              } ${
                todo.status === 'todo'
                  ? 'text-warning bg-warning-light hover:bg-warning-light-hover active:bg-warning-light-active'
                  : ''
              }`}
            >
              {todo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
