'use client';

import { Input, Select, Popover } from '@arco-design/web-react';
import { useTodoContext } from '../../context/TodoContext';
import { IMPORTANCE_MAP, URGENCY_MAP } from '../../constants';
import { useState } from 'react';
import CustomIcon from '@/components/Icon';
import IconSelector from '../IconSelector';
const TextArea = Input.TextArea;
import DateTimeTool from './DateTimeTool';
import dayjs from 'dayjs';

type TodoFormData = {
  name: string;
  description?: string;
  tags?: string[];
  importance?: number;
  urgency?: number;
  planDate?: string;
  planTimeRange?: [string, string];
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
};

export function TodoForm() {
  const { addTodo } = useTodoContext();
  const defaultFormData = {
    name: '',
  };
  const [formData, setFormData] = useState<TodoFormData>(defaultFormData);

  const onSubmit = () => {
    if (!formData.name) {
      return;
    }
    addTodo({
      name: formData.name,
      importance: formData.importance,
      urgency: formData.urgency,
      planDate: formData.planDate || undefined,
      planStartAt: formData.planTimeRange?.[0] || undefined,
      planEndAt: formData.planTimeRange?.[1] || undefined,
      recurring: formData.recurring,
      tags: formData.tags,
    });
    setFormData(defaultFormData);
  };

  return (
    <div className="border rounded-md py-2">
      <div className="px-1">
        <Input
          value={formData.name}
          placeholder="准备做什么?"
          type="primary"
          size="small"
          className="text-body-3 !bg-transparent !border-none mb-1"
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, name: value }));
          }}
          onPressEnter={() => {
            onSubmit();
          }}
        />
      </div>

      <div className="flex items-center gap-2 px-2.5 text-text-3">
        <DateTimeTool
          formData={{
            date: dayjs(formData.planDate),
            timeRange: formData.planTimeRange as [string, string],
            recurring: formData.recurring,
          }}
          onChangeData={(formData) => {
            setFormData((prev) => ({
              ...prev,
              planDate: formData.date.format('YYYY-MM-DD'),
              planTimeRange: formData.timeRange,
              recurring: formData.recurring as
                | 'none'
                | 'daily'
                | 'weekly'
                | 'monthly'
                | 'yearly',
            }));
          }}
        />
        <IconSelector
          map={IMPORTANCE_MAP}
          iconName="priority-0"
          value={formData.importance}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, importance: value }));
          }}
        />
        <IconSelector
          map={URGENCY_MAP}
          iconName="urgency"
          value={formData.urgency}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, urgency: value }));
          }}
        />
        <Popover
          content={
            <div className="p-1">
              <TextArea
                value={formData.description}
                placeholder="描述"
                className="text-body-3"
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, description: value }));
                }}
              />
            </div>
          }
          trigger="click"
        >
          <div className="px-1.5 h-7 rounded-sm hover:bg-fill-3 flex items-center cursor-pointer">
            <CustomIcon
              id="description"
              width={16}
              height={16}
              className={`cursor-pointer`}
            />
          </div>
        </Popover>

        <Popover
          content={
            <div className="p-1">
              <Select
                mode="multiple"
                allowCreate={true}
                placeholder="添加标签..."
                className="rounded-md"
              />
            </div>
          }
          trigger="click"
        >
          <div className="px-1.5 h-7 rounded-sm hover:bg-fill-3 flex items-center cursor-pointer">
            <CustomIcon
              id="tag"
              width={16}
              height={16}
              className={`cursor-pointer`}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
}
