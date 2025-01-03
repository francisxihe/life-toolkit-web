import { IRoute } from '@/router/routes';

export const todoRoutes: IRoute = {
  name: 'menu.todo',
  key: '/todo',
  breadcrumb: true,
  children: [
    {
      name: 'menu.todo.today',
      key: 'TodoToday',
      breadcrumb: true, 
    },
    {
      name: 'menu.todo.list',
      key: 'TodoList',
      breadcrumb: true,
    },
    {
      name: 'menu.todo.history',
      key: 'TodoHistory',
      breadcrumb: true,
    },
  ],
};

