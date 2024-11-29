'use client';

import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
} from '@arco-design/web-react';
import * as z from 'zod';
import { useTodoContext } from '../context/todo-context';
import {
  IMPORTANCE_LEVELS,
  URGENCY_LEVELS,
  RECURRENCE_PATTERNS,
} from '../constants';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { RangePicker } = DatePicker;

const todoSchema = z.object({
  task: z.string().min(1, { message: '任务描述不能为空' }),
  description: z.string(),
  tags: z.array(z.string()),
  importance: z.enum(['low', 'medium', 'high']),
  urgency: z.enum(['low', 'medium', 'high']),
  timeRange: z.tuple([z.string(), z.string()]),
  recurring: z.enum(['none', 'daily', 'weekly', 'monthly', 'yearly']),
});

export function TodoForm() {
  const { addTodo } = useTodoContext();
  const [form] = Form.useForm();
  const onSubmit = (values: z.infer<typeof todoSchema>) => {
    console.log(values);

    addTodo({
      task: values.task,
      importance: values.importance as 'low' | 'medium' | 'high',
      urgency: values.urgency as 'low' | 'medium' | 'high',
      startDateTime: values.timeRange[0],
      endDateTime: values.timeRange[1],
      recurring: values.recurring,
      tags: values.tags,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      layout="vertical"
      className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
      initialValues={{
        task: '',
        description: '',
        tags: [],
        importance: 'medium',
        urgency: 'medium',
        timeRange: ['', ''],
        recurring: 'none',
      }}
    >
      <FormItem
        label="任务"
        field="task"
        rules={[{ required: true, message: '请输入任务名称' }]}
      >
        <Input placeholder="请输入任务标题" className="rounded-md" />
      </FormItem>

      <FormItem label="描述" field="description">
        <TextArea
          placeholder="请输入任务详细描述"
          className="rounded-md min-h-[120px] resize-y"
        />
      </FormItem>

      <FormItem label="标签" field="tags">
        <Select
          mode="multiple"
          allowCreate={true}
          placeholder="添加标签..."
          className="rounded-md"
        />
      </FormItem>

      <div className="grid grid-cols-2 gap-4">
        <FormItem label="重要程度" field="importance">
          <Select placeholder="选择重要程度" className="rounded-md">
            {Object.entries(IMPORTANCE_LEVELS).map(([value, label]) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem label="紧急程度" field="urgency">
          <Select placeholder="选择紧急程度" className="rounded-md">
            {Object.entries(URGENCY_LEVELS).map(([value, label]) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </div>

      <FormItem label="起止时间" field={'timeRange'}>
        <RangePicker showTime className="w-full rounded-md" />
      </FormItem>

      <FormItem label="重复" field="recurring">
        <Select placeholder="选择重复模式" className="rounded-md">
          {Object.entries(RECURRENCE_PATTERNS).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full rounded-md hover:opacity-90 transition-opacity"
        >
          添加任务
        </Button>
      </FormItem>
    </Form>
  );
}
