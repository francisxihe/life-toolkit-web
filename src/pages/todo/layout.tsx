'use client';

import { TodoProvider } from './context/TodoContext';

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoProvider>{children}</TodoProvider>;
}
