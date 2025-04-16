import { DEFAULT_PATHS } from 'config.js';
import { USER_ROLE } from 'constants.js';
import { lazy } from 'react';

import HorizontalPage from 'views/Horizontal';
import VerticalPage from 'views/Vertical';

const home = {
  index: lazy(() => import('views/index')),
  dashboard: lazy(() => import('views/Dashboard')),
  roomDetails: lazy(() => import('views/rooms/components/RoomDetails')),
};

const hotel = {
  list: lazy(() => import('views/hotels/Hotels')),
};
const room = {
  list: lazy(() => import('views/rooms/Rooms')),
};
const bookings = {
  list: lazy(() => import('views/bookings/Bookings')),
  Mylist: lazy(() => import('views/bookings/MyBookings')),
};
const customers = {
  list: lazy(() => import('views/customers/Customer')),
  details: lazy(() => import('views/customers/CustomersDetail')),
};


const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [ 
    // {
    //   path: DEFAULT_PATHS.HOME,
    //   exact: true,
    //   redirect: true,
    //   to: '/home',
    // },

    {
      path: DEFAULT_PATHS.HOME,
      label: 'menu.home',
      icon: 'home-garage',
      exact: true,
      component: home.index,
      roles: [USER_ROLE.Default] 
    },
    {
      path: `${DEFAULT_PATHS.HOME}room/:id`,
      label: '',
      icon: '',
      exact: true,
      component: home.roomDetails,
      roles: [USER_ROLE.Default] 
    },

    {
      path: `${appRoot}/admin`,
      exact: true,
      redirect: true,
      to: `${appRoot}/admin/dashboard`,
      roles: [USER_ROLE.Admin] 
    },
    {
      path: `${appRoot}/customer`,
      exact: true,
      redirect: true,
      to: `${appRoot}/customer/dashboard`,
      roles: [USER_ROLE.Customer] 
    },
    {
      path: `${appRoot}/admin/dashboard`,
      component: home.dashboard,
      label: 'menu.dashboards',
      icon: 'menu-dashed',
      roles: [USER_ROLE.Admin],
    },
    {
      path: `${appRoot}/customer/dashboard`,
      label: 'menu.dashboards',
      icon: 'menu-dashed',
      component: home.dashboard,
      roles: [USER_ROLE.Customer],
    },

    {
      path: `${appRoot}/admin/hotels`,
      label: 'menu.hotels',
      icon: 'building',
      component: hotel.list ,
      exact: true,
      roles: [USER_ROLE.Admin],
    },
    {
      path: `${appRoot}/admin/rooms`,
      label: 'menu.room',
      icon: 'circle',
      exact: true,
      component: room.list,
      roles: [USER_ROLE.Admin],
    },
    {
      path: `${appRoot}/admin/bookings`,
      label: 'menu.bookings',
      icon: 'square',
      exact: true,
      component: bookings.list,
      roles: [USER_ROLE.Admin],
    },
    {
      path: `${appRoot}/customer/bookings`,
      label: 'menu.mybookings',
      icon: 'square',
      exact: true,
      component: bookings.Mylist,
      roles: [USER_ROLE.Customer],
    },
    {
      path: `${appRoot}/admin/customers`,
      label: 'menu.customers',
      icon: 'user',
      exact: true,
      component: customers.list,
      roles: [USER_ROLE.Admin],
    },
    {
      path: `${appRoot}/admin/customers/details/:customerId`,
      exact: true,
      component: customers.details,
      roles: [USER_ROLE.Admin],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
