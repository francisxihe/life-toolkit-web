import { Drawer } from '@arco-design/web-react';
import { useStore } from '@nanostores/react';
import { drawerQueueStore, closeDrawer } from './hooks';

const GlobalDrawer = () => {
  const drawerQueue = useStore(drawerQueueStore);

  //   function closeWhenRouteChange() {
  //     drawerQueue.value.forEach((drawerOption, index) => {
  //       closeDrawer(index);
  //     });
  //   }

  //   window.addEventListener('popstate', closeWhenRouteChange);

  //   onUnmounted(() => {
  //     window.removeEventListener('popstate', closeWhenRouteChange);
  //   });

  return (
    <>
      {drawerQueue.map((drawerOption, index) => {
        const DrawerContent = drawerOption.content;
        return (
          <Drawer
            key={index}
            {...drawerOption}
            onOk={drawerOption.onOk}
            onCancel={drawerOption.onCancel}
          >
            {drawerOption.visible && (
              <DrawerContent
                param={drawerOption.param}
                onCancel={() => closeDrawer(index)}
              />
            )}
          </Drawer>
        );
      })}
    </>
  );
};

export default GlobalDrawer;