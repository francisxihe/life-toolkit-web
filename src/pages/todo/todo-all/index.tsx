'use client';

import { TodoFilters } from './TodoFilters';
import { TodoList } from '../components/TodoList';
import { Button, Table } from '@arco-design/web-react';
import FlexibleContainer from '@/components/FlexibleContainer';
import { useTodoContext } from '../context/TodoContext';
import { useEffect } from 'react';

export default function TodoPage() {
  const { todoList, currentTodo, getTodoList } = useTodoContext();

  useEffect(() => {
    getTodoList();
  }, []);

  const columns = [
    { title: '待办', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '状态', dataIndex: 'completed', key: 'completed' },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    { title: '计划日期', dataIndex: 'planDate', key: 'planDate' },
    { title: '完成日期', dataIndex: 'completedAt', key: 'completedAt' },
    { title: '紧急程度', dataIndex: 'urgency', key: 'urgency' },
    { title: '重要程度', dataIndex: 'importance', key: 'importance' },
    {
      title: <span className="text-text-1 font-[500] px-4">操作</span>,
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="text">编辑</Button>
          <Button type="text">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <FlexibleContainer className="bg-background-2 rounded-lg w-full h-full">
      <FlexibleContainer.Fixed className="px-5 py-2 flex justify-between items-center border-b">
        <div className="text-text-1 text-title-2 font-[500] py-1">全部待办</div>
      </FlexibleContainer.Fixed>

      <FlexibleContainer.Fixed className="px-5 flex border-b">
        <TodoFilters />
      </FlexibleContainer.Fixed>

      <FlexibleContainer.Fixed className="px-5 flex">
        <Button type="primary">新建</Button>
      </FlexibleContainer.Fixed>

      {/* <TodoStats /> */}
      <FlexibleContainer.Shrink className="px-5 w-full h-full flex">
        <Table
          className="w-full"
          columns={columns}
          data={todoList}
          pagination={false}
          rowKey="id"
        />
      </FlexibleContainer.Shrink>
      {/* <div className="w-full py-2">
          <TodoForm />
        </div> */}
    </FlexibleContainer>
  );
}
