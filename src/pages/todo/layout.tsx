'use client';

import { TodoProvider } from './context/todo-context';

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoProvider>{children}</TodoProvider>;
}
