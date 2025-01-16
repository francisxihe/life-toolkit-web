import { atom } from 'nanostores';
import { DrawerProps } from '@arco-design/web-react';

export type IDrawerOption<DrawerParam> = Omit<DrawerProps, 'visible'> & {
  content: (props: {
    param?: DrawerParam;
    onCancel: () => void;
  }) => JSX.Element;
  param?: DrawerParam;
};

export const drawerQueueStore = atom<
  (IDrawerOption<unknown> & {
    visible: boolean;
  })[]
>([]);

export function openDrawer<T>(drawerOption: IDrawerOption<T>) {
  let flag = false;
  let index = 0;

  const drawerQueue = drawerQueueStore.get();
  while (!flag && index < drawerQueue.length) {
    if (!drawerQueue[index].visible) {
      flag = true;
      drawerQueue[index] = {
        ...drawerOption,
        visible: true,
      };
      drawerQueueStore.set([...drawerQueue]);
    } else {
      index++;
    }
  }

  if (!flag) {
    drawerQueueStore.set([
      ...drawerQueue,
      {
        ...drawerOption,
        visible: true,
      },
    ]);
  }

  function closeDrawer() {
    drawerQueue[index].visible = false;
    drawerQueueStore.set([...drawerQueue]);
  }

  return {
    closeDrawer,
  };
}

export function closeDrawer(index: number) {
  const drawerQueue = drawerQueueStore.get();
  drawerQueue[index].visible = false;
  drawerQueueStore.set([...drawerQueue]);
}
