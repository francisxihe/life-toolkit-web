import { IRoute } from '@/router/routes';
import lazyload from '@/utils/lazyload';
import { isArray } from 'lodash';
import { useSelector } from 'react-redux';
import { GlobalState } from '@/store';
import useRoute from '@/router/routes';
import { useMemo } from 'react';
import NProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';
import { getComponentModule } from './helpers';

export const RouterContext = createContext(null);

export interface FlattenRoute extends IRoute {
  component?: any;
}

export default function useRouter() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: GlobalState) => state);

  const [routes, defaultRoute] = useRoute(userInfo?.permissions);

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

  function routerTo(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      navigate(currentRoute.path ? currentRoute.path : `/${key}`);
      NProgress.done();
    });
  }

  return {
    flattenRoutes: getFlattenRoutes(routes),
    to: routerTo,
  };
}

export function getFlattenRoutes(routes: IRoute[]) {
  const res = [];
  function travel(_routes: IRoute[], parentPath?: string) {
    return _routes.map((route) => {
      const flattenRoute: FlattenRoute = { ...route };

      try {
        flattenRoute.fullPath = undefined;
        if (flattenRoute.key && !flattenRoute.onlyMenu) {
          if (/^\//.test(flattenRoute.key)) {
            flattenRoute.fullPath = flattenRoute.key;
          } else if (parentPath) {
            flattenRoute.fullPath = `${parentPath}/${flattenRoute.key}`;
          }
        }
        if (flattenRoute.fullPath) {
          flattenRoute.component = lazyload(
            getComponentModule(flattenRoute.fullPath)
          );
          res.push(flattenRoute);
        }
      } catch (e) {
        console.log(flattenRoute.key);
        // console.error(e);
      }
      console.log(flattenRoute.component);

      if (isArray(flattenRoute.children) && flattenRoute.children.length) {
        flattenRoute.children = travel(flattenRoute.children, flattenRoute.key);
      }
      return flattenRoute;
    });
  }

  travel(routes, '');
  return res;
}
