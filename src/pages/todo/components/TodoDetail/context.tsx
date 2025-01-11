'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  useRef,
  useCallback,
} from 'react';
import { Todo, TodoNode } from '../../service/types';
import { TodoFormData } from '../../types';
import TodoService from '../../service/api';

interface TodoDetailContextType {
  todoNode: TodoNode;
  todoFormData: TodoFormData;
  setTodoFormData: Dispatch<React.SetStateAction<TodoFormData>>;
  onClose: () => Promise<void> | null;
  onChange: (todo: TodoFormData) => Promise<void>;
  refreshTodoFormData: (todo: Todo) => Promise<void>;
  initTodoFormData: (todo: Todo) => Promise<void>;
}

const TodoDetailContext = createContext<TodoDetailContextType | undefined>(
  undefined
);

export function TodoDetailProvider(props: {
  children: React.ReactNode;
  todo: Todo;
  onClose: () => Promise<void> | null;
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

  const refreshTodoFormData = async (todo: Todo) => {
    const fetchedTodoNode = await TodoService.getTodoNode(todo.id);
    setTodoNode(fetchedTodoNode);
    todoNodeRef.current = fetchedTodoNode;
    setTodoFormData(transformTodo(todoNodeRef.current));
  };

  const initTodoFormData = useCallback(async () => {
    const fetchedTodoNode = await TodoService.getTodoNode(props.todo.id);
    setTodoNode(fetchedTodoNode);
    todoNodeRef.current = fetchedTodoNode;
    setTodoFormData(transformTodo(todoNodeRef.current));
  }, [props.todo]);

  useEffect(() => {
    initTodoFormData();
  }, [initTodoFormData]);

  let onClose = null;
  if (props.onClose) {
    onClose = async () => {
      setTodoFormData(null);
      await props.onClose();
    };
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
        onClose,
        onChange,
        refreshTodoFormData,
        initTodoFormData,
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
