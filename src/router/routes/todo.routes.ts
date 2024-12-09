import { IRoute } from '@/router/routes';

export const todoRoutes: IRoute = {
  name: 'menu.todo',
  key: '/todo',
  children: [
    {
      name: 'menu.todo.list',
      key: 'TodoList',
    },
    {
      name: 'menu.todo.history',
      key: 'TodoHistory',
    },
  ],
};
