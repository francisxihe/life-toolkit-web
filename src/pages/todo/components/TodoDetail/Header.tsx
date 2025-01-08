import { Divider, Button } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import FlexibleContainer from '@/components/FlexibleContainer';
import DoneTodoCheckbox from '../DoneTodoCheckbox';
import DateTimeTool from '../AddTodo/DateTimeTool';
import { useTodoContext } from '../../context';
import IconSelector from '../IconSelector';
import { IMPORTANCE_MAP, URGENCY_MAP } from '../../constants';

export default function TodoDetailHeader() {
  const { currentTodo, restoreTodo, setCurrentTodo, doneTodo } =
    useTodoContext();

  return (
    <FlexibleContainer
      direction="vertical"
      className="flex items-center px-1.5 text-text-3 border-b mb-2 !h-12"
    >
      <FlexibleContainer.Shrink className="flex items-center">
        <DoneTodoCheckbox todo={currentTodo} />
        <Divider type="vertical" className={'!mx-1'} />
        <DateTimeTool
          formData={{
            date: dayjs(currentTodo.planDate),
            timeRange: [currentTodo.planStartAt, currentTodo.planEndAt],
            recurring: currentTodo.recurring,
          }}
          onChangeData={(formData) => {
            setCurrentTodo((prev) => ({
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
          value={currentTodo.importance}
          onChange={(value) => {
            setCurrentTodo((prev) => ({ ...prev, importance: value }));
          }}
        />
        <IconSelector
          map={URGENCY_MAP}
          iconName="urgency"
          value={currentTodo.urgency}
          onChange={(value) => {
            setCurrentTodo((prev) => ({ ...prev, urgency: value }));
          }}
        />
      </FlexibleContainer.Shrink>
      <FlexibleContainer.Fixed className="flex items-center">
        <Button
          type="text"
          size="small"
          icon={<IconClose className="!text-text-3" />}
          onClick={() => setCurrentTodo(null)}
        />
      </FlexibleContainer.Fixed>
    </FlexibleContainer>
  );
}
