import dayjs, { Dayjs } from 'dayjs';
import { useCalendarContext } from './context';
import { Todo } from '../service/types';

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        // handleEditEvent(event);
      }}
      className={`min-w-[200px] text-body-1 px-1.5 leading-[20px] rounded-[2px] truncate cursor-pointer ${
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
  );
}

export default function CalendarCell({ cellDate }: { cellDate: Dayjs }) {
  const { todoList, calendarMode, pageShowDate } = useCalendarContext();

  const getTodoForDay = (day: Dayjs) => {
    return todoList.filter((todo) => dayjs(todo.planDate).isSame(day, 'day'));
  };

  const todayTodoList = getTodoForDay(cellDate);

  // const [showMoreTodo, setShowMoreTodo] = useState(false);

  return (
    <div className={`!text-body-3`}>
      <div
        className={`p-1 ${
          cellDate.isBefore(pageShowDate, 'month') ||
          cellDate.isAfter(pageShowDate, 'month')
            ? 'opacity-50'
            : ''
        }`}
        onDoubleClick={() => {
          console.log('double click');
        }}
      >
        <div className={`leading-[24px]`}>{cellDate.date()}</div>
        {calendarMode === 'month' && (
          <>
            <div className="mt-1 flex flex-col gap-0.5">
              {todayTodoList.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
            {/* {todayTodoList.length > 3 && (
              <div>
                <Popover
                  position="bl"
                  popupVisible={showMoreTodo}
                  trigger={'click'}
                  content={
                    <div className="mt-1 flex flex-col gap-0.5">
                      {todayTodoList
                        .slice(3, todayTodoList.length)
                        .map((todo) => (
                          <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                  }
                >
                  <span
                    className="text-text-2 cursor-pointer px-1 rounded-xs hover:bg-fill active:bg-fill-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMoreTodo(true);
                      // handleEditEvent(event);
                    }}
                  >
                    +{todayTodoList.length - 3}
                  </span>
                </Popover>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
}
