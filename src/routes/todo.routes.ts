import { IRoute } from '@/routes/index';

export const todoRoutes: IRoute = {
  name: 'menu.todo',
  key: 'todo',
  isWrapper: true,
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
