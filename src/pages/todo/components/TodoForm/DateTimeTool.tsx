import { Popover, Calendar, Select, TimePicker } from '@arco-design/web-react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import dayjs, { Dayjs } from 'dayjs';
import { RECURRENCE_PATTERNS } from '../../constants';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';

const { RangePicker } = TimePicker;

export default function DateTimeTool(props: {
  formData: {
    date: Dayjs;
    timeRange: [string | undefined, string | undefined];
    recurring: string | undefined;
  };
  onChangeData: (formData: {
    date: Dayjs;
    timeRange: [string | undefined, string | undefined];
    recurring: string | undefined;
  }) => void;
}) {
  const { formData, onChangeData } = props;
  const [mode, setMode] = useState<'month' | 'year'>('month');
  return (
    <Popover
      trigger="click"
      content={
        <div className="py-3 w-72">
          <div className="w-full flex justify-center">
            <Calendar
              panel
              panelWidth={'100%'}
              value={formData.date}
              defaultValue={dayjs()}
              className="w-full !border-none"
              onChange={(date) => {
                if (mode === 'year') {
                  setMode('month');
                } else {
                  onChangeData({
                    ...formData,
                    date: date,
                  });
                }
              }}
              mode={mode}
              headerRender={({
                value,
                pageShowDate,
                onChange,
                onChangePageDate,
                onChangeMode,
              }) => (
                <div className="text-body-3 px-5 flex items-center justify-between">
                  <div
                    onClick={() => {
                      setMode('year');
                      onChangeMode('year');
                    }}
                    className="cursor-pointer px-2"
                  >
                    {pageShowDate?.format(
                      mode === 'year' ? 'YYYY年' : 'YYYY年MM月'
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <IconLeft
                      className="!text-text-3 cursor-pointer"
                      onClick={() => {
                        if (mode === 'year') {
                          onChangePageDate(pageShowDate?.subtract(1, 'year'));
                        } else {
                          onChangePageDate(pageShowDate?.subtract(1, 'month'));
                        }
                      }}
                    />
                    <a
                      className="h-5 text-text-3 text-body-2 relative group cursor-pointer"
                      onClick={() => onChangePageDate(value)}
                    >
                      今天
                    </a>
                    <IconRight
                      className="!text-text-3 cursor-pointer"
                      onClick={() => {
                        if (mode === 'year') {
                          onChangePageDate(pageShowDate?.add(1, 'year'));
                        } else {
                          onChangePageDate(pageShowDate?.add(1, 'month'));
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            />
          </div>
          <div className="px-3 mb-2">
            <RangePicker
              value={formData.timeRange}
              className="w-full rounded-md"
              format="HH:mm"
              step={{ minute: 5 }}
              disableConfirm
              allowClear
              onChange={(time) => {
                onChangeData({
                  ...formData,
                  timeRange: [time[0], time[1]],
                });
              }}
            />
          </div>
          <div className="px-3">
            <Select
              value={formData.recurring}
              placeholder="选择重复模式"
              className="rounded-md"
              allowClear
              onChange={(value) => {
                onChangeData({
                  ...formData,
                  recurring: value,
                });
              }}
            >
              {Object.entries(RECURRENCE_PATTERNS).map(([value, label]) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      }
    >
      <div className="px-1.5 h-7 rounded-sm hover:bg-fill-3 flex items-center gap-2 cursor-pointer">
        <CustomIcon width={16} height={16} id="today-icon-27" />
        今天
      </div>
    </Popover>
  );
}
