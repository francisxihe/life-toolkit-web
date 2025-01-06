'use client';

import { Input, Select, Popover } from '@arco-design/web-react';
import * as z from 'zod';
import { useTodoContext } from '../../context/TodoContext';
import { IMPORTANCE_MAP, URGENCY_MAP } from '../../constants';
import { useState } from 'react';
import CustomIcon from '@/components/Icon';
import IconSelector from '../IconSelector';
const TextArea = Input.TextArea;
import DateTimeTool from './DateTimeTool';

const todoSchema = z.object({
  name: z.string().default(''),
  description: z.string().default(''),
  tags: z.array(z.string()).default([]),
  importance: z.number().default(2),
  urgency: z.number().default(2),
  planDate: z.string().default(''),
  planTimeRange: z.tuple([z.string(), z.string()]).default(['', '']),
  recurring: z
    .enum(['none', 'daily', 'weekly', 'monthly', 'yearly'])
    .default('none'),
});

export function TodoForm() {
  const { addTodo } = useTodoContext();

  const [formData, setFormData] = useState<z.infer<typeof todoSchema>>({});
  const onSubmit = () => {
    const values = todoSchema.parse(formData);
    if (!values.name) {
      return;
    }

    addTodo({
      name: values.name,
      importance: values.importance,
      urgency: values.urgency,
      planDate: values.planDate || undefined,
      planStartAt: values.planTimeRange[0] || undefined,
      planEndAt: values.planTimeRange[1] || undefined,
      recurring: values.recurring,
      tags: values.tags,
    });
    setFormData({
      ...todoSchema.parse({}),
      name: '',
    });
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
      </div>

      <div className="flex items-center gap-2 px-2.5 text-text-3">
        <DateTimeTool />

        <Popover
          content={
            <div className="flex flex-col gap-4">
              <IconSelector
                map={IMPORTANCE_MAP}
                icon="priority-0"
                value={formData.importance}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, importance: value }));
                }}
              />
            </div>
          }
          trigger="click"
        >
          <div className="px-1.5 h-7 rounded-sm hover:bg-fill-3 flex items-center  cursor-pointer">
            <CustomIcon
              width={16}
              height={16}
              id="priority-0"
              className={`cursor-pointer`}
            />
          </div>
        </Popover>
        <Popover
          content={
            <div className="flex flex-col gap-4">
              <IconSelector
                map={URGENCY_MAP}
                icon="urgency"
                value={formData.urgency}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, urgency: value }));
                }}
              />
            </div>
          }
          trigger="click"
        >
          <div className="px-1.5 h-7 rounded-sm hover:bg-fill-3 flex items-center cursor-pointer">
            <CustomIcon
              id="urgency"
              width={16}
              height={16}
              className={`cursor-pointer`}
            />
          </div>
        </Popover>
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
