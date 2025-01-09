import { Drawer } from '@arco-design/web-react';
import TodoDetail from '../components/TodoDetail';
import { Todo } from '../service/types';
import { Form, Input } from '@arco-design/web-react';

export default function TodoEditorDrawer(props: {
  todo: Todo;
  visible: boolean;
  onCancel: () => Promise<void>;
  onChange: () => Promise<void>;
}) {
  return (
    <Drawer
      title="编辑"
      visible={props.visible}
      width={500}
      onCancel={() => {
        props.onCancel();
      }}
      onOk={() => {
        props.onChange();
      }}
    >
      <TodoDetail
        todo={props.todo}
        onCancel={() => {
          return props.onCancel();
        }}
        onChange={() => {
          return props.onChange();
        }}
      />
    </Drawer>
  );
}
