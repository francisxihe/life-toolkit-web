import { Button } from '@arco-design/web-react';
import { useTodoContext } from '../../context';

export default function TodoDetailFooter() {
  const { currentTodo, updateTodo, setCurrentTodo } = useTodoContext();

  return (
    <div className="flex justify-end items-center gap-2 border-t pt-2">
      <Button
        type="default"
        className="!rounded-sm"
        onClick={() => {
          setCurrentTodo(null);
        }}
      >
        取消
      </Button>
      <Button
        type="primary"
        className="!rounded-sm"
        onClick={() => {
          updateTodo(currentTodo.id, {
            ...currentTodo,
          });
          setCurrentTodo(null);
        }}
      >
        确定
      </Button>
    </div>
  );
}
