'use client';

import {
  Checkbox,
  Card,
  Tag,
  Space,
  Typography,
  Input,
  Popover,
  Button,
} from '@arco-design/web-react';
import { useTodoContext } from '../../context';
import { Todo } from '../../types';
import { isToday } from 'date-fns';
import FlexibleContainer from '@/components/FlexibleContainer';
import { URGENCY_MAP, IMPORTANCE_MAP } from '../../constants';
import IconSelector from '../IconSelector';
import DoneTodoCheckbox from '../DoneTodoCheckbox';
import CustomIcon from '@/components/Icon';
import TodoService from '../../ApiService';
const { Text, Paragraph } = Typography;

export function TodoList({ todoList }: { todoList: Todo[] }) {
  const { showTodoDetail, loadTodoList } = useTodoContext();

  return (
    <div className="w-full mt-[-8px]">
      {todoList.map((todo) => (
        <div
          className={'w-full border-b pl-4 py-2 bg-background'}
          key={todo.id}
        >
          <FlexibleContainer direction="vertical" className="items-start">
            <FlexibleContainer.Fixed className="flex items-start ">
              <DoneTodoCheckbox todo={todo} />
            </FlexibleContainer.Fixed>
            <FlexibleContainer.Shrink
              onClick={() => showTodoDetail(todo.id)}
              className="cursor-pointer"
            >
              <div className="leading-8">{todo.name}</div>
              {todo.description && (
                <Paragraph
                  className="text-body-1 !mb-0.5"
                  style={{
                    textDecoration:
                      todo.status === 'done' ? 'line-through' : 'none',
                    color: 'var(--color-text-3)',
                  }}
                >
                  {todo.description}
                </Paragraph>
              )}
              <div className="text-body-2 flex items-center gap-2">
                {todo.importance && (
                  <IconSelector
                    map={IMPORTANCE_MAP}
                    iconName="priority-0"
                    value={todo.importance}
                    readonly
                  />
                )}

                {todo.urgency && (
                  <IconSelector
                    map={URGENCY_MAP}
                    iconName="urgency"
                    value={todo.urgency}
                    readonly
                  />
                )}

                {!isToday(todo.planDate) && (
                  <Text type="error">
                    {todo.planDate}{' '}
                    {todo.planStartAt && todo.planEndAt && (
                      <>
                        {todo.planStartAt}-{todo.planEndAt}
                      </>
                    )}
                  </Text>
                )}
                {todo.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {todo.tags.map((tag, index) => (
                      <Tag key={index} color="arcoblue">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </FlexibleContainer.Shrink>
            <FlexibleContainer.Fixed>
              <div className="h-8 flex items-center">
                <Popover
                  trigger="click"
                  content={
                    <div className="w-40">
                      <div
                        className="cursor-pointer px-3 h-9 leading-9 hover:bg-fill-2"
                        onClick={() => {
                          TodoService.abandonTodo(todo.id);
                          loadTodoList();
                        }}
                      >
                        放弃
                      </div>
                      <div
                        className="cursor-pointer px-3 h-9 leading-9 hover:bg-fill-2"
                        onClick={() => {
                          TodoService.deleteTodo(todo.id);
                          loadTodoList();
                        }}
                      >
                        删除
                      </div>
                    </div>
                  }
                >
                  <Button
                    iconOnly
                    type="text"
                    size="mini"
                    icon={<CustomIcon id="more-for-task" />}
                  />
                </Popover>
              </div>
            </FlexibleContainer.Fixed>
          </FlexibleContainer>
        </div>
      ))}
    </div>
  );
}
