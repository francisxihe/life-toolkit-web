import { Input } from '@arco-design/web-react';
import { useTodoContext } from '../../context/TodoContext';

const TextArea = Input.TextArea;

export default function TodoDetail() {
  const { currentTodo, updateTodo, setCurrentTodo } = useTodoContext();

  return (
    <div>
      <Input
        value={currentTodo.name}
        placeholder="准备做什么?"
        type="primary"
        size="small"
        className="!text-text-1 !bg-transparent !border-none mb-1"
        onChange={(value) => {
          setCurrentTodo((prev) => ({ ...prev, name: value }));
        }}
        onBlur={(e) => {
          updateTodo(currentTodo.id, {
            ...currentTodo,
          });
        }}
      />
      <TextArea
        autoSize={false}
        value={currentTodo.description}
        placeholder="描述一下"
        className="!text-text-3 !text-body-1 !bg-transparent !border-none mb-1"
        onChange={(value) => {
          setCurrentTodo((prev) => ({ ...prev, description: value }));
        }}
        onBlur={(e) => {
          updateTodo(currentTodo.id, {
            ...currentTodo,
          });
        }}
      />
    </div>
  );
}
