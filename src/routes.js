/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';
import DashboardDefaultView from './views/DashboardDefault';
import OverviewView from './views/Overview';
import PresentationView from './views/Presentation';

const privateRoute = component => {
  // console.log(configureStore().getState().session);
  const token = localStorage.getItem('token');
  if (token) {
    console.log(Cookies.getJSON('user'));
    return component;
  }
  return () => <Redirect to="/auth/login" />;
};

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboards/analytics" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/searchLoan',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Buscar')))
      },
      {
        path: '/calendar',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Calendar')))
      },
      {
        path: '/createLoan',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Crear')))
      },
      {
        path: '/createClient',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/CrearCliente')))
      },
      {
        path: '/changelog',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Changelog')))
      },
      {
        path: '/clientes',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Clientes')))
      },
      {
        path: '/configuration',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Configuration')))
      },
      {
        path: '/configuration/:tab',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Configuration')))
      },
      {
        path: '/contabilidad',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Contabilidad')))
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: privateRoute(DashboardAnalyticsView)
      },
      {
        path: '/dashboards/default',
        exact: true,
        component: privateRoute(DashboardDefaultView)
      },
      {
        path: '/invoices/:id',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/InvoiceDetails')))
      },
      {
        path: '/kanban-board',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/KanbanBoard')))
      },
      {
        path: '/loanDetail/:id',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/LoanDetail')))
      },
      {
        path: '/loanDetail/:id/:tab',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/LoanDetail')))
      },
      {
        path: '/management/customers',
        exact: true,
        component: privateRoute(
          lazy(() => import('src/views/CustomerManagementList'))
        )
      },
      {
        path: '/management/customers/:id',
        exact: true,
        component: privateRoute(
          lazy(() => import('src/views/CustomerManagementDetails'))
        )
      },
      {
        path: '/management/customers/:id/:tab',
        exact: true,
        component: privateRoute(
          lazy(() => import('src/views/CustomerManagementDetails'))
        )
      },
      {
        path: '/management/projects',
        exact: true,
        component: privateRoute(
          lazy(() => import('src/views/ProjectManagementList'))
        )
      },
      {
        path: '/management/orders',
        exact: true,
        component: privateRoute(
          lazy(() => import('src/views/OrderManagementList'))
        )
      },
      {
        path: '/management/orders/:id',
        exact: true,
        component: privateRoute(
          lazy(() => import('src/views/OrderManagementDetails'))
        )
      },
      {
        path: '/overview',
        exact: true,
        component: privateRoute(OverviewView)
      },
      {
        path: '/presentation',
        exact: true,
        component: privateRoute(PresentationView)
      },
      {
        path: '/prestamos',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Prestamos')))
      },
      {
        path: '/procesadorDePagos',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/ProcesadordePagos')))
      },
      {
        path: '/profile/:id',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Profile')))
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Profile')))
      },
      {
        path: '/projects/create',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/ProjectCreate')))
      },
      {
        path: '/projects/:id',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/ProjectDetails')))
      },
      {
        path: '/projects/:id/:tab',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/ProjectDetails')))
      },
      {
        path: '/projects',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/ProjectList')))
      },
      {
        path: '/reporteria',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Reporteria')))
      },
      {
        path: '/recursosHumanos',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/RRHH')))
      },
      {
        path: '/settings',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Settings')))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/Settings')))
      },
      {
        path: '/social-feed',
        exact: true,
        component: privateRoute(lazy(() => import('src/views/SocialFeed')))
      },
      {
        path: '/overview',
        exact: true,
        component: privateRoute(lazy(() => OverviewView))
      },
      {
        path: '/overview',
        exact: true,
        component: privateRoute(lazy(() => PresentationView))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
