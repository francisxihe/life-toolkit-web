import { Input, Button } from '@arco-design/web-react';
import { useTodoDetailContext } from './context';
import TodoService from '../../service/api';
import TodoList from '../TodoList';
const TextArea = Input.TextArea;

export default function TodoDetailMain() {
  const { todoFormData, setTodoFormData, todoNode, onChange } =
    useTodoDetailContext();

  return todoFormData ? (
    <>
      <Input
        value={todoFormData.name}
        placeholder="准备做什么?"
        type="primary"
        size="small"
        className="!text-text-1 !bg-transparent !border-none mb-1"
        onChange={(value) => {
          setTodoFormData((prev) => ({ ...prev, name: value }));
        }}
        onBlur={() => {
          onChange(todoFormData);
        }}
      />
      <TextArea
        autoSize={false}
        value={todoFormData.description}
        placeholder="描述一下"
        className="!text-text-3 !text-body-1 !bg-transparent !border-none mb-1"
        onChange={(value) => {
          setTodoFormData((prev) => ({
            ...prev,
            description: value,
          }));
        }}
      />
      <div>
        <TodoList
          todoList={todoNode.subTodoList}
          onClickTodo={() => {
            console.log('onClickTodo');
          }}
          loadTodoList={() => {
            console.log('loadTodoList');
          }}
        />
      </div>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          TodoService.addSubTodo(todoNode.id, {
            name: '新子待办',
            tags: [],
          });
        }}
      >
        添加子待办
      </Button>
    </>
  ) : (
    <></>
  );
}
