import { Routes, Route } from 'react-router-dom';
import { useRouter } from './layout';
import Login from './pages/login';
import PageLayout, { FlattenRoute } from './layout';
import lazyload from './utils/lazyload';

function Router() {
  const { flattenRoutes } = useRouter();

  function renderRouteComponent(routes: FlattenRoute[]) {
    return routes.map((route) => {
      return (
        route.component && (
          <Route
            key={route.key}
            path={`/${route.key}`}
            element={<route.component />}
          >
            {/* {renderRouteComponent(route.children)} */}
          </Route>
        )
      );
    });
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PageLayout />}>
        {renderRouteComponent(flattenRoutes)}
        {/* {flattenRoutes.map((route) => {
          return (
            <Route
              key={route.key}
              path={`/${route.key}`}
              element={<route.component />}
            >
              {route.children?.map((child) => {
                return (
                  child.component && (
                    <Route
                      key={child.key}
                      path={`/${child.key}`}
                      element={<child.component />}
                    />
                  )
                );
              })}
            </Route>
          );
        })} */}
        {/* <Route
          path="/"
          // element={<Navigate to={`/${defaultRoute}`} />}
        /> */}
        <Route
          path="*"
          element={lazyload(() => import('./pages/exception/403'))}
        />
      </Route>
    </Routes>
  );
}

export default Router;
