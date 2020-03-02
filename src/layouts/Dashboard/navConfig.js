/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
// Icons for the navbar
import AccountBallanceIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
// import BarChartIcon from '@material-ui/icons/BarChart';
import BusinessIcon from '@material-ui/icons/BusinessCenterOutlined';
import AttachMoneyIcon from '@material-ui/icons/AttachMoneyOutlined';
// import AccountIcon from '@material-ui/icons/AccountBalanceOutlined';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import ChatIcon from '@material-ui/icons/ChatOutlined';
// import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
// import ErrorIcon from '@material-ui/icons/ErrorOutline';
// import FolderIcon from '@material-ui/icons/FolderOutlined';
// import HomeIcon from '@material-ui/icons/HomeOutlined';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
// import MailIcon from '@material-ui/icons/MailOutlined';
import MonetizationIcon from '@material-ui/icons/MonetizationOnOutlined';
import PaymentIcon from '@material-ui/icons/PaymentOutlined';
// import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
// import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import ShowChartIcon from '@material-ui/icons/ShowChartOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
// import ViewConfigIcon from '@material-ui/icons/ViewComfy';
// import ListIcon from '@material-ui/icons/List';
// import Label from 'src/components/Label';

export default [
  {
    subheader: 'Home',
    items: [
      // {
      //   title: 'Inicio',
      //   href: '/overview',
      //   icon: HomeIcon
      // },
      {
        title: 'Dashboard',
        href: '/dashboards/analytics',
        icon: DashboardIcon,
      }
    ]
  },
  {
    subheader: 'Services',
    items: [
      {
        title: 'Clientes',
        href: '/clientes',
        icon: PersonIcon,
      },
      {
        title: 'Contabilidad',
        href: '/contabilidad',
        icon: MonetizationIcon,
      },
      {
        title: 'Gestor',
        href: '/management',
        icon: BusinessIcon,
        items: [
          {
            title: 'Buscar',
            href: '/searchLoan',
            icon: SearchIcon,
          },
          {
            title: 'Crear Prestamo',
            href: '/createLoan',
            icon: CreateIcon,
          },
          {
            title: 'Crear Cliente',
            href: '/createClient',
            icon: PersonAddIcon,
          },
          {
            title: 'Recobro',
            href: '/management/customers/1/summary',
            icon: AttachMoneyIcon,
          },
        ]
      },
      {
        title: 'Prestamos',
        href: '/prestamos',
        icon: AccountBallanceIcon,
      },
      {
        title: 'Procesador de Pago',
        href: '/procesadorDePagos',
        icon: PaymentIcon,
      },
      {
        title: 'Reportería',
        href: '/reporteria',
        icon: ShowChartIcon,
      },
      {
        title: 'RRHH',
        href: '/recursosHumanos',
        icon: PeopleIcon,
      },
    ]
  },
  {
    subheader: 'Settings',
    items: [
      {
        title: 'Settings',
        href: '/configuration',
        icon: SettingsIcon,
        items: [
          {
            title: 'General',
            href: '/configuration/general'
          },
          {
            title: 'Security',
            href: '/configuration/security'
          }
        ]
      }
    ]
  }
];
