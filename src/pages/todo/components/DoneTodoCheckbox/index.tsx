import { Checkbox } from '@arco-design/web-react';
import styles from './style.module.less';
import TodoService from '../../service/api';
import { useTodoContext } from '../../context';
import { Todo } from '../../service/types';

export default function DoneTodoCheckbox(props: {
  todo: {
    status: Todo['status'];
    id: string;
  };
}) {
  const { loadTodoList } = useTodoContext();

  return (
    <div
      className={`w-8 h-8 flex items-center ${styles['custom-checkbox-wrapper']}`}
    >
      <Checkbox
        checked={props.todo.status === 'done'}
        onChange={() => {
          if (props.todo.status === 'todo') {
            TodoService.doneTodo(props.todo.id);
          } else {
            TodoService.restoreTodo(props.todo.id);
          }
          loadTodoList();
        }}
      />
    </div>
  );
}
