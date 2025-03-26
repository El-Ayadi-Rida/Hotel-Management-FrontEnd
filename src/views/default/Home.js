import React, { useMemo } from 'react';

// import redux for auth guard
import { useSelector } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';
import useCustomLayout from 'hooks/useCustomLayout';
import { LAYOUT, MENU_PLACEMENT, USER_ROLE } from 'constants.js';
import { DEFAULT_USER } from 'config.js';

const Home = () => {
  useCustomLayout({ placement: MENU_PLACEMENT.Horizontal, layout: LAYOUT.Boxed });

  const isLogin = true ;
  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: DEFAULT_USER.role }), [isLogin, DEFAULT_USER]);
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

export default Home;
