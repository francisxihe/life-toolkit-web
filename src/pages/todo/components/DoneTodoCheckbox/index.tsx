import { Checkbox } from '@arco-design/web-react';
import styles from './style.module.less';
import { Todo } from '../../types';
import TodoService from '../../ApiService';
import { useTodoContext } from '../../context';

export default function DoneTodoCheckbox(props: { todo: Todo }) {
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
