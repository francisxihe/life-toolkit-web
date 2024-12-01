import { IRoute } from '@/router/routes';

export const todoRoutes: IRoute = {
  name: 'menu.todo',
  key: 'todo',
  children: [
    {
      name: 'menu.todo.page',
      key: 'todo/page',
    },
    {
      name: 'menu.todo.history',
      key: 'todo/history/page',
    },
  ],
};
