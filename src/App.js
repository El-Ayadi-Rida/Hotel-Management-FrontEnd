import React, { useEffect, useMemo } from 'react';

// import redux for auth guard
import { useDispatch, useSelector } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';
import useCustomLayout from 'hooks/useCustomLayout';
import { LAYOUT, MENU_PLACEMENT, USER_ROLE } from 'constants.js';
import { menuChangePlacement } from 'layout/nav/main-menu/menuSlice';

const App = () => {
  useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Boxed });
  const dispatch = useDispatch();
  const { currentUser, isLogin } = useSelector((state) => state.auth);


  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: currentUser?.role }), [isLogin, currentUser]);
  console.log(routes);
  
  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    );
  }
  return <></>;
};

export default App;
