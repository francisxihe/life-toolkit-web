'use client';

import { useCallback } from 'react';
import { Input, Select, Button, Space, Grid } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { useTodoContext } from '../context/todo-context';
import { IMPORTANCE_LEVELS, URGENCY_LEVELS } from '../constants';
import { TagInput } from '../components/tag-input';
import type { TodoFilters } from '../types';

const { Row, Col } = Grid;

export function TodoFilters() {
  const { filters, setFilters } = useTodoContext();

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters((prev: TodoFilters) => ({ ...prev, search: value }));
    },
    [setFilters]
  );

  const handleImportanceChange = useCallback(
    (value: string) => {
      setFilters((prev: TodoFilters) => ({ ...prev, importance: value }));
    },
    [setFilters]
  );

  const handleUrgencyChange = useCallback(
    (value: string) => {
      setFilters((prev: TodoFilters) => ({ ...prev, urgency: value }));
    },
    [setFilters]
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      setFilters((prev: TodoFilters) => ({ ...prev, status: value }));
    },
    [setFilters]
  );

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      setFilters((prev: TodoFilters) => ({ ...prev, tags }));
    },
    [setFilters]
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      importance: 'all',
      urgency: 'all',
      status: 'all',
      tags: [],
    });
  }, [setFilters]);

  return (
    <Space
      direction="vertical"
      style={{ width: '100%', marginBottom: 24 }}
      size="large"
    >
      <Row gutter={[16, 16]}>
        <Col flex="auto" span={6}>
          <Input
            prefix={<IconSearch />}
            placeholder="Search tasks..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </Col>
        <Col span={6}>
          <Select
            value={filters.importance}
            onChange={handleImportanceChange}
            style={{ width: 180 }}
          >
            <Select.Option value="all">All Importance</Select.Option>
            {Object.entries(IMPORTANCE_LEVELS).map(([value, label]) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={filters.urgency}
            onChange={handleUrgencyChange}
            style={{ width: 180 }}
          >
            <Select.Option value="all">All Urgency</Select.Option>
            {Object.entries(URGENCY_LEVELS).map(([value, label]) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={filters.status}
            onChange={handleStatusChange}
            style={{ width: 180 }}
          >
            <Select.Option value="all">All Status</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </Col>
      </Row>

      <Row align="center" gutter={8}>
        <Col>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Filter by tags:</span>
        </Col>
        <Col flex="auto">
          <TagInput
            value={filters.tags}
            onChange={handleTagsChange}
            placeholder="Add tags to filter..."
          />
        </Col>
      </Row>
    </Space>
  );
}
