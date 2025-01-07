import { IRoute } from '@/router/routes';

export const todoRoutes: IRoute = {
  name: 'menu.todo',
  key: '/todo',
  breadcrumb: true,
  children: [
    {
      name: 'menu.todo.today',
      key: 'todo-today',
      breadcrumb: true,
    },
    {
      name: 'menu.todo.all',
      key: 'todo-all',
      breadcrumb: true,
    },
    {
      name: 'menu.todo.history',
      key: 'todo-history',
      breadcrumb: true,
    },
  ],
};
