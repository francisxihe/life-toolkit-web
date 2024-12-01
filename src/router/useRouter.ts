import { IRoute } from '@/router/routes';
import { FlattenRoute } from '@/layout';
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
  function travel(_routes: IRoute[], routePath: FlattenRoute[]) {
    _routes.forEach((route) => {
      const flattenRoute: FlattenRoute = { ...route };

      try {
        if (route.key && !route.onlyMenu) {
          flattenRoute.component = lazyload(getComponentModule(route.key));
          flattenRoute.routePath = [...routePath, flattenRoute];
          res.push(flattenRoute);
        }
      } catch (e) {
        console.log(route.key);
        // console.error(e);
      }

      if (isArray(route.children) && route.children.length) {
        travel(
          route.children,
          flattenRoute.component ? [...routePath, flattenRoute] : routePath
        );
      }
    });
  }

  travel(routes, []);
  return res;
}
