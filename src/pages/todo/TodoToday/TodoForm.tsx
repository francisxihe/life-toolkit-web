'use client';

import {
  Form,
  Input,
  Select,
  DatePicker,
  Popover,
} from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import * as z from 'zod';
import { useTodoContext } from '../context/TodoContext';
import {
  IMPORTANCE_LEVELS,
  URGENCY_LEVELS,
  RECURRENCE_PATTERNS,
} from '../constants';
import { useState } from 'react';

const Icon = ({ id, width = 16, height = 16 }) => (
  <svg width={width} height={height}>
    <use href={`/public/icons.svg#${id}`} />
  </svg>
);

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { RangePicker } = DatePicker;

const todoSchema = z.object({
  task: z.string().default(''),
  description: z.string().default(''),
  tags: z.array(z.string()).default([]),
  importance: z.enum(['low', 'medium', 'high']).default('medium'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  timeRange: z.tuple([z.string(), z.string()]).default(['', '']),
  recurring: z
    .enum(['none', 'daily', 'weekly', 'monthly', 'yearly'])
    .default('none'),
});

export function TodoForm() {
  const { addTodo } = useTodoContext();

  const [formData, setFormData] = useState<z.infer<typeof todoSchema>>({});
  const onSubmit = () => {
    const values = todoSchema.parse(formData);
    if (!values.task) {
      return;
    }

    addTodo({
      task: values.task,
      importance: values.importance as 'low' | 'medium' | 'high',
      urgency: values.urgency as 'low' | 'medium' | 'high',
      startDateTime: values.timeRange[0] || undefined,
      endDateTime: values.timeRange[1] || undefined,
      recurring: values.recurring,
      tags: values.tags,
    });
    setFormData({
      ...todoSchema.parse({}),
      task: '',
    });
  };

  return (
    <div>
      <Input
        size="large"
        placeholder="请输入任务标题"
        value={formData.task}
        onChange={(value) => {
          setFormData((prev) => ({ ...prev, task: value }));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
        suffix={
          <div className="flex items-center gap-2">
            <Popover
              trigger="click"
              content={
                <div>
                  <FormItem label="起止时间" field={'timeRange'}>
                    <RangePicker showTime className="w-full rounded-md" />
                  </FormItem>

                  <FormItem label="重复" field="recurring">
                    <Select placeholder="选择重复模式" className="rounded-md">
                      {Object.entries(RECURRENCE_PATTERNS).map(
                        ([value, label]) => (
                          <Select.Option key={value} value={value}>
                            {label}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </FormItem>
                </div>
              }
            >
              <div className="px-3 py-1.5 my-1.5 rounded-sm hover:bg-fill-3 flex items-center gap-2 cursor-pointer">
                <Icon width={16} height={16} id="today-icon-27" />
                今天
              </div>
            </Popover>
            <Popover
              content={
                <div className="flex flex-col gap-4">
                  <TextArea
                    placeholder="请输入任务详细描述"
                    className="rounded-md min-h-[120px] resize-y"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormItem label="重要程度" field="importance">
                      <Select placeholder="选择重要程度" className="rounded-md">
                        {Object.entries(IMPORTANCE_LEVELS).map(
                          ([value, label]) => (
                            <Select.Option key={value} value={value}>
                              {label}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </FormItem>

                    <FormItem label="紧急程度" field="urgency">
                      <Select placeholder="选择紧急程度" className="rounded-md">
                        {Object.entries(URGENCY_LEVELS).map(
                          ([value, label]) => (
                            <Select.Option key={value} value={value}>
                              {label}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </FormItem>
                  </div>

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
              <div className="px-1.5 py-1.5 my-1.5 rounded-sm hover:bg-fill-3 cursor-pointer">
                <IconDown />
              </div>
            </Popover>
          </div>
        }
      />
    </div>
  );
}
