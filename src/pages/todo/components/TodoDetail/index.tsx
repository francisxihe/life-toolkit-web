import { Button, Input, Divider } from '@arco-design/web-react';
import { useTodoContext } from '../../context/TodoContext';
import TodoDetailHeader from './Header';
import TodoDetailFooter from './Footer';
import FlexibleContainer from '@/components/FlexibleContainer';
const TextArea = Input.TextArea;

export default function TodoDetail() {
  const { currentTodo, updateTodo, setCurrentTodo, toggleTodo } =
    useTodoContext();

  return (
    <FlexibleContainer>
      <FlexibleContainer.Fixed>
        <TodoDetailHeader />
      </FlexibleContainer.Fixed>
      <FlexibleContainer.Shrink>
        <Input
          value={currentTodo.name}
          placeholder="准备做什么?"
          type="primary"
          size="small"
          className="!text-text-1 !bg-transparent !border-none mb-1"
          onChange={(value) => {
            setCurrentTodo((prev) => ({ ...prev, name: value }));
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
        />
      </FlexibleContainer.Shrink>
      <FlexibleContainer.Fixed>
        <TodoDetailFooter />
      </FlexibleContainer.Fixed>
    </FlexibleContainer>
  );
}
