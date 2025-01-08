'use client';

import { TodoFilters } from './TodoFilters';
import { TodoList } from '../components/TodoList';
import { Button, Modal, Table } from '@arco-design/web-react';
import FlexibleContainer from '@/components/FlexibleContainer';
import { useTodoContext } from '../context';
import { useEffect } from 'react';
import { URGENCY_MAP, IMPORTANCE_MAP } from '../constants';
import TodoService from '../ApiService';

export default function TodoPage() {
  const { todoList, loadTodoList } = useTodoContext();

  useEffect(() => {
    loadTodoList();
  }, []);

  const columns = [
    { title: '待办', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '状态',
      key: 'status',
      render: (_, record) => {
        switch (record.status) {
          case 'done':
            return <div className="text-success">已完成({record.doneAt})</div>;
          case 'todo':
            return <div className="text-warning">未完成</div>;
          case 'abandoned':
            return (
              <div className="text-danger">已放弃({record.abandonedAt})</div>
            );
          default:
            return '--';
        }
      },
    },
    { title: '计划日期', dataIndex: 'planDate', key: 'planDate' },
    {
      title: '紧急程度',
      key: 'urgency',
      render: (_, record) => (
        <div>{URGENCY_MAP.get(record.urgency)?.label}</div>
      ),
    },
    {
      title: '重要程度',
      key: 'importance',
      render: (_, record) => (
        <div>{IMPORTANCE_MAP.get(record.importance)?.label}</div>
      ),
    },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    {
      title: <span className="text-text-1 font-[500] px-4">操作</span>,
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="text">编辑</Button>
          <Button
            type="text"
            onClick={() =>
              Modal.confirm({
                title: '确定删除吗？',
                content: '删除后将无法恢复',
                onOk: () => {
                  TodoService.deleteTodo(record.id);
                  loadTodoList();
                },
              })
            }
          >
            删除
          </Button>
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
