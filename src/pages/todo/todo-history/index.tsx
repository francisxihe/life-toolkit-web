'use client';

import { useMemo, useState } from 'react';
import { format, isWithinInterval } from 'date-fns';
import { Card, Grid, Typography, Statistic } from '@arco-design/web-react';
import { useTodoContext } from '../context';
import { CompletedTodoList } from './components/completed-todo-list';
import {
  HistoryFilters,
  type HistoryFilters as HistoryFiltersType,
} from './components/history-filters';

// 引入 ECharts
import ReactECharts from 'echarts-for-react';

const { Row, Col } = Grid;
const { Title } = Typography;

export default function TodoHistoryPage() {
  const { todoList } = useTodoContext();
  const [filters, setFilters] = useState<HistoryFiltersType>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    importance: 'all',
    urgency: 'all',
    tags: [],
  });

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.completed) return false;

      // Date range filter
      if (filters.dateRange.from && filters.dateRange.to) {
        const completedDate = new Date(todo.doneAt);
        if (
          !isWithinInterval(completedDate, {
            start: filters.dateRange.from,
            end: filters.dateRange.to,
          })
        ) {
          return false;
        }
      }

      // Importance filter
      if (
        filters.importance !== 'all' &&
        todo.importance !== filters.importance
      ) {
        return false;
      }

      // Urgency filter
      if (filters.urgency !== 'all' && todo.urgency !== filters.urgency) {
        return false;
      }

      // Tags filter
      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => todo.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    });
  }, [todoList, filters]);

  const chartData = useMemo(() => {
    const data: { date: string; completed: number }[] = [];
    const grouped = filteredTodos.reduce((acc, todo) => {
      const date = format(new Date(todo.doneAt), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(grouped).forEach(([date, count]) => {
      data.push({
        date: format(new Date(date), 'MMM d'),
        completed: count,
      });
    });

    return data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7); // Last 7 days
  }, [filteredTodos]);

  const stats = useMemo(() => {
    const total = filteredTodos.length;
    const highPriority = filteredTodos.filter(
      (todo) => todo.importance === 'high' && todo.urgency === 'high'
    ).length;
    const avgCompletionTime =
      filteredTodos.reduce((acc, todo) => {
        const start = new Date(todo.startDateTime);
        const end = new Date(todo.doneAt);
        return acc + (end.getTime() - start.getTime());
      }, 0) / (total || 1);

    return {
      total,
      highPriority,
      avgCompletionTime: Math.round(avgCompletionTime / (1000 * 60 * 60 * 24)), // Convert to days
    };
  }, [filteredTodos]);

  return (
    <div className="space-y-6">
      <Title heading={3}>Todo History</Title>

      <HistoryFilters onFiltersChange={setFilters} />

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Completed" value={stats.total} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="High Priority Completed"
              value={stats.highPriority}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Avg. Completion Time"
              value={stats.avgCompletionTime}
              suffix="days"
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Title heading={5}>Completion Trend</Title>
        <div style={{ height: 300 }}>
          <ReactECharts
            option={{
              xAxis: {
                data: chartData.map((item) => item.date),
              },
              yAxis: {
                data: chartData.map((item) => item.completed),
              },
            }}
          />
        </div>
      </Card>

      <Card>
        <Title heading={5}>Completed Tasks</Title>
        <CompletedTodoList todos={filteredTodos} />
      </Card>
    </div>
  );
}
