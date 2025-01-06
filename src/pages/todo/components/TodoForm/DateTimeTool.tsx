import { Popover, Calendar, Select, TimePicker } from '@arco-design/web-react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import dayjs, { Dayjs } from 'dayjs';
import { RECURRENCE_PATTERNS } from '../../constants';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';

const { RangePicker } = TimePicker;

export default function DateTimeTool() {
  const [date, setDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState([
    dayjs(),
    dayjs().add(30, 'minute'),
  ]);
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
              value={date}
              defaultValue={date}
              className="w-full !border-none"
              onChange={(date) => {
                if (mode === 'year') {
                  setMode('month');
                } else {
                  setDate(date);
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
                      className="!text-text-4 cursor-pointer"
                      onClick={() => {
                        if (mode === 'year') {
                          onChangePageDate(pageShowDate?.subtract(1, 'year'));
                        } else {
                          onChangePageDate(pageShowDate?.subtract(1, 'month'));
                        }
                      }}
                    />
                    <a
                      className="w-5 h-5 relative group"
                      onClick={() => onChangePageDate(value)}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-text-4"></div>
                    </a>
                    <IconRight
                      className="!text-text-4 cursor-pointer"
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
          <div className="px-3">
            <RangePicker
              allowClear
              className="w-full rounded-md"
              format="HH:mm"
              step={{ minute: 5 }}
              disableConfirm
              value={timeRange}
              onChange={(time) => {
                setTimeRange([dayjs(time[0]), dayjs(time[1])]);
              }}
            />
          </div>
          <div className="px-3">
            <Select placeholder="选择重复模式" className="rounded-md">
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
