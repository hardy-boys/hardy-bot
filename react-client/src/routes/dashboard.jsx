// @material-ui/icons

import DevicesOther from '@material-ui/icons/DevicesOther';
import Person from '@material-ui/icons/Person';
import DeveloperBoard from '@material-ui/icons/DeveloperBoard';
import LocationOn from '@material-ui/icons/LocationOn';
import StoreMallDirectory from '@material-ui/icons/StoreMallDirectory';

// core components/views

import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import UserProfile from 'views/UserProfile/UserProfile.jsx';
import DeviceProfiles from 'views/DeviceProfiles/DeviceProfiles.jsx';

import Maps from 'views/Maps/Maps.jsx';
import WidgetsPage from 'views/Widgets/Widgets.jsx';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Device Dashboard',
    navbarName: 'Device Dashboard',
    icon: DevicesOther,
    component: DashboardPage,
  },
  {
    path: '/device_profiles',
    sidebarName: 'Device Profiles',
    navbarName: 'Device Profiles',
    icon: DeveloperBoard,
    component: DeviceProfiles,
  },
  {
    path: '/widgets',
    sidebarName: 'Widgets Store',
    navbarName: 'Widgets Store',
    icon: StoreMallDirectory, // Need to change this
    component: WidgetsPage,
  },
  {
    path: '/map',
    sidebarName: 'Device Location',
    navbarName: 'Device Location',
    icon: LocationOn,
    component: Maps,
  },
  {
    path: '/user',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile,
  },
  {
    redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect',
  },
  // {
  //   redirect: true, path: '/login', to: '/login', navbarName: 'Login',
  // },
];

export default dashboardRoutes;
