'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  useRef,
} from 'react';
import { Todo, TodoNode } from '../../service/types';
import { TodoFormData } from '../../types';
import TodoService from '../../service/api';

interface TodoDetailContextType {
  todoNode: TodoNode;
  todoFormData: TodoFormData;
  setTodoFormData: Dispatch<React.SetStateAction<TodoFormData>>;
  onCancel: () => Promise<void>;
  onChange: (todo: TodoFormData) => Promise<void>;
}

const TodoDetailContext = createContext<TodoDetailContextType | undefined>(
  undefined
);

export function TodoDetailProvider(props: {
  children: React.ReactNode;
  todo: Todo;
  onClose: () => Promise<void>;
  onChange: (todo: Todo) => Promise<void>;
}) {
  function transformTodo(todo: TodoNode): TodoFormData {
    return {
      name: todo.name,
      description: todo.description,
      tags: todo.tags,
      importance: todo.importance,
      urgency: todo.urgency,
      planDate: todo.planDate,
      planTimeRange: [todo.planStartAt, todo.planEndAt],
      recurring: todo.recurring,
      subTodoList: todo.subTodoList,
    };
  }

  function transformTodoFormData(todoFormData: TodoFormData): TodoNode {
    return {
      name: todoFormData.name,
      description: todoFormData.description,
      tags: todoFormData.tags,
      importance: todoFormData.importance,
      urgency: todoFormData.urgency,
      planDate: todoFormData.planDate,
      planStartAt: todoFormData.planTimeRange?.[0],
      planEndAt: todoFormData.planTimeRange?.[1],
      recurring: todoFormData.recurring,
      id: todoNode.id,
      createdAt: todoNode.createdAt,
      status: todoNode.status,
      subTodoList: todoNode.subTodoList,
    };
  }

  const [todoFormData, setTodoFormData] = useState<TodoFormData>();

  const [todoNode, setTodoNode] = useState<TodoNode>(props.todo as TodoNode);
  const todoNodeRef = useRef<TodoNode>();

  useEffect(() => {
    const initTodoFormData = async () => {
      const fetchedTodoNode = await TodoService.getTodoNode(props.todo.id);
      setTodoNode(fetchedTodoNode); // 更新状态
      todoNodeRef.current = fetchedTodoNode; // 更新 ref 值
      setTodoFormData(transformTodo(todoNodeRef.current));
    };
    initTodoFormData();
  }, [props.todo]);

  async function onCancel() {
    setTodoFormData(null);
    await props.onClose();
  }

  async function onChange(todoFormData: TodoFormData) {
    setTodoFormData(todoFormData);
    const todo = transformTodoFormData(todoFormData);
    await TodoService.updateTodo(todo.id, todo);
    await props.onChange(todo);
  }

  return (
    <TodoDetailContext.Provider
      value={{
        todoNode,
        todoFormData,
        setTodoFormData,
        onCancel,
        onChange,
      }}
    >
      {props.children}
    </TodoDetailContext.Provider>
  );
}

export function useTodoDetailContext() {
  const context = useContext(TodoDetailContext);
  if (!context) {
    throw new Error(
      'useTodoDetailContext must be used within a TodoDetailProvider'
    );
  }
  return context;
}
