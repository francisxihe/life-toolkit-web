'use client';

import { useCallback } from 'react';
import { Input, Select, Button, Space, Grid } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { IMPORTANCE_MAP, URGENCY_MAP } from '../constants';
import { TagInput } from '../components/TagInput';
import type { TodoFilters } from '../types';
import { useState } from 'react';

const { Row, Col } = Grid;

export function TodoFilters() {
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    importance: undefined,
    urgency: undefined,
    status: 'all',
    tags: [],
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters((prev: TodoFilters) => ({ ...prev, search: value }));
    },
    [setFilters]
  );

  const handleImportanceChange = useCallback(
    (value: number | null) => {
      setFilters((prev: TodoFilters) => ({ ...prev, importance: value }));
    },
    [setFilters]
  );

  const handleUrgencyChange = useCallback(
    (value: number | null) => {
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
      importance: undefined,
      urgency: undefined,
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
            allowClear
            placeholder="All Importance"
          >
            {[...Array.from(IMPORTANCE_MAP.entries())].map(
              ([key, { label }]) => (
                <Select.Option key={key} value={key}>
                  {label}
                </Select.Option>
              )
            )}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={filters.urgency}
            onChange={handleUrgencyChange}
            allowClear
            placeholder="All Urgency"
          >
            {[...Array.from(URGENCY_MAP.entries())].map(([key, { label }]) => (
              <Select.Option key={key} value={key}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={filters.status}
            onChange={handleStatusChange}
            allowClear
            placeholder="All Status"
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <TagInput
            value={filters.tags}
            onChange={handleTagsChange}
            placeholder="Add tags to filter..."
          />
        </Col>
        <Col span={6}>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </Col>
      </Row>
    </Space>
  );
}
