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
import { IMPORTANCE_MAP, URGENCY_MAP, RECURRENCE_PATTERNS } from '../constants';
import { useState, MouseEventHandler } from 'react';
import CustomIcon from '@/components/Icon';
import IconSelector from '../components/IconSelector';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { RangePicker } = DatePicker;

const todoSchema = z.object({
  task: z.string().default(''),
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
    if (!values.task) {
      return;
    }

    addTodo({
      task: values.task,
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
                  <FormItem label="日期" field={'planDate'}>
                    <DatePicker
                      className="w-full rounded-md"
                      placeholder="请选择计划日期"
                    />
                  </FormItem>
                  <FormItem label="起止时间" field={'planTimeRange'}>
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
                <CustomIcon
                  width={16}
                  height={16}
                  id="today-icon-27"
                  className="text-text-2"
                />
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

                  <IconSelector
                    map={IMPORTANCE_MAP}
                    icon="priority-1"
                    value={formData.importance}
                    onChange={(value) => {
                      setFormData((prev) => ({ ...prev, importance: value }));
                    }}
                  />

                  <IconSelector
                    map={URGENCY_MAP}
                    icon="urgency"
                    value={formData.urgency}
                    onChange={(value) => {
                      setFormData((prev) => ({ ...prev, urgency: value }));
                    }}
                  />

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
