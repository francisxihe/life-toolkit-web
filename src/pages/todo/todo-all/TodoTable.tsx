import { Table, Button, Modal, Card, Divider } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { URGENCY_MAP, IMPORTANCE_MAP } from '../constants';
import { useTodoAllContext } from './context';
import { useEffect, useState } from 'react';
import TodoService from '../service/api';
import { Todo, TodoNode } from '../service/types';
import TodoEditorDrawer from './TodoEditorDrawer';

export default function TodoTable() {
  const { todoList, getTodoList } = useTodoAllContext();

  useEffect(() => {
    async function initData() {
      await getTodoList();
      todoList.forEach((item) => {
        setSubTodoLoadingStatus((prev) => ({
          ...prev,
          [item.id]: 'unLoading',
        }));
      });
    }
    initData();
  }, []);

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const columns = [
    { title: '待办', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '状态',
      key: 'status',
      render: (_, record) => {
        switch (record.status) {
          case 'done':
            return (
              <div className="text-success">
                已完成({dayjs(record.doneAt).format('YYYY-MM-DD HH:mm')})
              </div>
            );
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
    {
      title: '计划日期',
      key: 'planDate',
      render: (_, record) => (
        <div>
          {dayjs(record.planDate).format('YYYY-MM-DD')}
          {record.planStart &&
            record.planEnd &&
            `${dayjs(record.planStart).format('YYYY-MM-DD')}
             - ${dayjs(record.planEnd).format('YYYY-MM-DD')}`}
        </div>
      ),
    },
    {
      title: '紧急程度',
      key: 'urgency',
      render: (_, record) => (
        <div>{URGENCY_MAP.get(record.urgency)?.label || '--'}</div>
      ),
    },
    {
      title: '重要程度',
      key: 'importance',
      render: (_, record) => (
        <div>{IMPORTANCE_MAP.get(record.importance)?.label || '--'}</div>
      ),
    },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    {
      title: <span className="text-text-1 font-[500] px-4">操作</span>,
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            type="text"
            onClick={() => {
              setCurrentTodo(record);
              setDrawerVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="text"
            onClick={() =>
              Modal.confirm({
                title: '确定删除吗？',
                content: '删除后将无法恢复',
                onOk: () => {
                  TodoService.deleteTodo(record.id);
                  getTodoList();
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

  const [expandedData, setExpandedData] = useState<Record<string, TodoNode>>(
    {}
  );
  const [subTodoLoadingStatus, setSubTodoLoadingStatus] = useState<
    Record<string, 'unLoading' | 'loading' | 'loaded' | 'error'>
  >({});
  const onExpandTable = async (record: Todo, expanded: boolean) => {
    if (!expanded) {
      return;
    }
    setSubTodoLoadingStatus((prev) => ({ ...prev, [record.id]: 'loading' }));
    const todoNode = await TodoService.getTodoNode(record.id);
    setExpandedData((prev) => ({
      ...prev,
      [record.id]: todoNode,
    }));
    setSubTodoLoadingStatus((prev) => ({ ...prev, [record.id]: 'loaded' }));
  };

  return (
    <>
      <Table
        className="w-full"
        columns={columns}
        data={todoList}
        pagination={false}
        rowKey="id"
        onExpand={onExpandTable}
        expandedRowRender={(record) => {
          if (subTodoLoadingStatus[record.id] === 'unLoading') return true;
          if (subTodoLoadingStatus[record.id] === 'loading') {
            return (
              <Card
                loading={subTodoLoadingStatus[record.id] === 'loading'}
              ></Card>
            );
          }
          if (subTodoLoadingStatus[record.id] === 'loaded') {
            return expandedData[record.id]?.subTodoList?.length ? (
              <Card>
                {expandedData[record.id]?.subTodoList
                  .map((item) => item.name)
                  .join(',')}
              </Card>
            ) : null;
          }
        }}
      />
      <TodoEditorDrawer
        visible={drawerVisible}
        todo={currentTodo}
        onCancel={async () => {
          setDrawerVisible(false);
          await getTodoList();
          if (subTodoLoadingStatus[currentTodo.id] === 'loaded') {
            onExpandTable(currentTodo, true);
          }
        }}
      />
    </>
  );
}
