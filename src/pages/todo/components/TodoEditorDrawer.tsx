import { Drawer } from '@arco-design/web-react';
import TodoDetail from './TodoDetail';
import { Todo } from '../service/types';
import { Form, Input } from '@arco-design/web-react';

export default function TodoEditorDrawer(props: {
  todo: Todo;
  visible: boolean;
  onCancel: () => Promise<void>;
}) {
  return (
    <Drawer
      unmountOnExit
      title={`编辑`}
      visible={props.visible}
      width={500}
      onCancel={props.onCancel}
      footer={null}
    >
      <TodoDetail
        todo={props.todo}
        onClose={null}
        onChange={async () => {
          console.log('onChange');
        }}
      />
    </Drawer>
  );
}
