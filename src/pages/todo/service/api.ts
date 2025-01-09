import dayjs from 'dayjs';
import {
  Todo,
  SubTodo,
  TodoNode,
  SubTodoNode,
  GetTodoListParams,
} from './types';

export default class TodoService {
  static async getTodoList(params: GetTodoListParams = {}): Promise<Todo[]> {
    let todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    ).filter((todo) => !todo.parentId);

    if (params.planDateStart && params.planDateEnd) {
      todoList = todoList
        .filter((todo) => todo.planDate)
        .filter(
          (todo) =>
            dayjs(todo.planDate).isAfter(params.planDateStart, 'day') &&
            dayjs(todo.planDate).isBefore(params.planDateEnd, 'day')
        );
    } else if (params.planDateStart) {
      todoList = todoList
        .filter((todo) => todo.planDate)
        .filter((todo) =>
          dayjs(todo.planDate).isAfter(params.planDateStart, 'day')
        );
    } else if (params.planDateEnd) {
      todoList = todoList
        .filter((todo) => todo.planDate)
        .filter((todo) =>
          dayjs(todo.planDate).isBefore(params.planDateEnd, 'day')
        );
    }

    if (params.doneDateStart && params.doneDateEnd) {
      todoList = todoList
        .filter((todo) => todo.doneAt)
        .filter((todo) => {
          return (
            dayjs(todo.doneAt).isAfter(params.doneDateStart, 'day') &&
            dayjs(todo.doneAt).isBefore(params.doneDateEnd, 'day')
          );
        });
    } else if (params.doneDateStart) {
      todoList = todoList
        .filter((todo) => todo.doneAt)
        .filter((todo) =>
          dayjs(todo.doneAt).isAfter(params.doneDateStart, 'day')
        );
    } else if (params.doneDateEnd) {
      todoList = todoList
        .filter((todo) => todo.doneAt)
        .filter((todo) =>
          dayjs(todo.doneAt).isBefore(params.doneDateEnd, 'day')
        );
    }

    if (params.abandonedDateStart && params.abandonedDateEnd) {
      todoList = todoList
        .filter((todo) => todo.abandonedAt)
        .filter(
          (todo) =>
            dayjs(todo.abandonedAt).isAfter(params.abandonedDateStart, 'day') &&
            dayjs(todo.abandonedAt).isBefore(params.abandonedDateEnd, 'day')
        );
    } else if (params.abandonedDateStart) {
      todoList = todoList
        .filter((todo) => todo.abandonedAt)
        .filter((todo) =>
          dayjs(todo.abandonedAt).isAfter(params.abandonedDateStart, 'day')
        );
    } else if (params.abandonedDateEnd) {
      todoList = todoList
        .filter((todo) => todo.abandonedAt)
        .filter((todo) =>
          dayjs(todo.abandonedAt).isBefore(params.abandonedDateEnd, 'day')
        );
    }

    if (params.keyword) {
      todoList = todoList.filter(
        (todo) =>
          todo.name.includes(params.keyword) ||
          todo.description?.includes(params.keyword)
      );
    }

    if (params.status) {
      todoList = todoList.filter((todo) => todo.status === params.status);
    }

    if (params.importance) {
      todoList = todoList.filter(
        (todo) => todo.importance === params.importance
      );
    }

    if (params.urgency) {
      todoList = todoList.filter((todo) => todo.urgency === params.urgency);
    }

    return todoList;
  }

  static async getTodoTree() {
    const todoList = await this.getTodoList();
    // 递归获取子待办
    const getSubTodoList = async (todo: Todo | SubTodo) => {
      const subTodoList = await this.getSubTodoList(todo.id);
      return subTodoList.map(async (t) => ({
        ...t,
        subTodoList: await getSubTodoList(t),
      }));
    };

    const todoTree = todoList.map(async (todo) => ({
      ...todo,
      subTodoList: await getSubTodoList(todo),
    }));

    return todoTree;
  }

  static async getTodoSubTodoIdList(todoId: string): Promise<string[]> {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );
    const todo = todoList.find((todo) => todo.id === todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    const todoSubTodoIdList: string[] = [];

    const recursiveSub = async (todoId: string) => {
      (await this.getSubTodoList(todoId)).forEach((t) => {
        if (t.status === 'todo') {
          todoSubTodoIdList.push(t.id);
        }
        recursiveSub(t.id);
      });
    };

    await recursiveSub(todoId);

    return todoSubTodoIdList;
  }

  static async getTodoNode(todoId: string): Promise<TodoNode> {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );
    const todo = todoList.find((todo) => todo.id === todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    // 递归获取子待办
    const recursiveGetSub = async (todoId: string) => {
      const subTodoList: SubTodoNode[] = (
        await this.getSubTodoList(todoId)
      ).map((t) => ({
        ...t,
        subTodoList: [],
      }));

      for (let i = 0; i < subTodoList.length; i++) {
        subTodoList[i].subTodoList = await recursiveGetSub(subTodoList[i].id);
      }

      return subTodoList;
    };

    const subTodoList = await recursiveGetSub(todo.id);

    return {
      ...todo,
      subTodoList,
    };
  }

  static async getSubTodoList(todoId: string): Promise<SubTodo[]> {
    const todoList: SubTodo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );
    return todoList.filter((todo) => todo.parentId === todoId);
  }

  static async addTodo(todo: Omit<Todo, 'id' | 'status' | 'createdAt'>) {
    const todoList = await this.getTodoList();
    const newTodo = {
      id: Math.random().toString(36).substring(7),
      status: 'todo',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ...todo,
    };
    localStorage.setItem('todoList', JSON.stringify([...todoList, newTodo]));
    return newTodo;
  }

  static async addSubTodo(
    todoId: string,
    subTodo: Omit<SubTodo, 'id' | 'status' | 'createdAt' | 'parentId'>
  ) {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );

    const newSubTodo = {
      id: Math.random().toString(36).substring(7),
      parentId: todoId,
      status: 'todo',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ...subTodo,
    };
    localStorage.setItem('todoList', JSON.stringify([...todoList, newSubTodo]));
    return newSubTodo;
  }

  static async updateTodo(id: string, todo: Partial<Todo>) {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );

    localStorage.setItem(
      'todoList',
      JSON.stringify(todoList.map((t) => (t.id === id ? { ...t, ...todo } : t)))
    );
  }

  static async batchDoneTodo(idList: string[]) {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );

    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          idList.includes(todo.id)
            ? {
                ...todo,
                status: 'done',
                doneAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              }
            : todo
        )
      )
    );
  }

  static async restoreTodo(id: string) {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );

    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status: 'todo',
                doneAt: undefined,
              }
            : todo
        )
      )
    );
  }

  static async deleteTodo(id: string) {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );

    localStorage.setItem(
      'todoList',
      JSON.stringify(todoList.filter((todo) => todo.id !== id))
    );
  }

  static async abandonTodo(id: string) {
    const todoList: Todo[] = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    );

    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status: 'abandoned',
                abandonedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              }
            : todo
        )
      )
    );
  }
}
