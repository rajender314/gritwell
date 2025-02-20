import React, {useContext, lazy} from 'react';

import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';
import SignIn from '../modules/sign-in/component/sign-in';
// const SignIn = lazy(()=> import('../modules/sign-in/component/sign-in'))
import RecoveryPassword
  from '../modules/recovery-password/component/recovery-password';
import CommonLayout from '../components/commonlayout/commonlayout';
import ForgotPassword
  from '../modules/forgot-password/component/forgot-password';
import ChangePassword
  from '../modules/change-password/component/change-password';
import {PrivateRoute} from './private-route';
import UsersList from '../modules/users/component/user-list';
import Clients from '../modules/clients/component/clients';
import Profile from '../modules/admin-profile/component/admin-profile';
import CustomerProfile
  from '../modules/customer-profile/component/customer-profile';
import {AuthContext} from '../providers/auth';
import Roles from '../modules/roles/component/roles';
import {Dashboard} from '../modules/dashboard/component';
import {Chats} from '../modules/chats/component';
import SalesClients from '../modules/sales-manager/sales-clients/sales-client';
import {HealthClients} from '../modules/health-coach/component';
import {MDClients} from '../modules/md/component';
import MDClient from '../modules/md/md-clients/md-client';
import CareManagerClient
  from '../modules/care-manager/care-client/care-clients';
import HCClient from '../modules/health-coach/health-clients/health-clients';
import Nutrition
  from '../modules/recommendations/nutrition/component/nutrition';
import Testing from '../modules/recommendations/testing/component';
import Supplements from '../modules/recommendations/supplements/component';
import Lifestyle from '../modules/recommendations/lifestyle/component';
import Rootcause from '../modules/hypothesis/rootcause/component';
import Diagnosis from '../modules/hypothesis/diagnosis/component';
import Coredysfunction from '../modules/hypothesis/coredysfunction/component';
import Goals from '../modules/hypothesis/goals/component/goals';
import PermissionDenied from '../components/permission-denied/PermissionDenied';
import Onboard from '../modules/health-plan/component';
import HealthPlan from '../modules/health-plan/component/health-plan';
import Plans from '../modules/plans/component/plans'

const commonRoutes = [
  {
    path: '/',
    component: SignIn,
    private: false,
    // disablelogin: true,
  },
  {
    path: '/sign-in',
    component: SignIn,
    private: false,
    // disablelogin: true,
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    private: false,
    // disablelogin: true,
  },
  {
    path: '/recoverypassword/:id/:type',
    component: RecoveryPassword,
    private: false,
    // disablelogin: true,
  },
  {
    path: '/changepassword',
    component: ChangePassword,
    private: true,
  },
  {
    path: '/permission-denied',
    component: PermissionDenied,
    private: false,
    // disablelogin: true,
  },

];

const officeRoutes = [
  {
    path: '/office/user',
    component: UsersList,
    private: true,
  },
  {
    path: '/office/profile',
    component: Profile,
    private: true,
  },
  {
    path: '/office/clients',
    component: Clients,
    private: true,
  },
  {
    path: '/office/client/:id',
    component: CareManagerClient,
    private: true,
  },
  {
    path: '/office/roles',
    component: Roles,
    private: true,
  },
  {
    path: '/office/plans',
    component: Plans,
    private: true,
  },
  {
    path: '/office/dashboard',
    component: Dashboard,
    private: true,
  },
  {
    path: '/office/chats',
    component: Chats,
    private: true,
  },
  {
    path: '/office/nutrition',
    component: Nutrition,
    private: true,
  },
  {
    path: '/office/testing',
    component: Testing,
    private: true,
  },
  {
    path: '/office/supplements',
    component: Supplements,
    private: true,
  },
  {
    path: '/office/lifestyle',
    component: Lifestyle,
    private: true,
  },
  {
    path: '/office/rootcause',
    component: Rootcause,
    private: true,
  },
  {
    path: '/office/diagnosis',
    component: Diagnosis,
    private: true,
  },
  {
    path: '/office/coredysfunction',
    component: Coredysfunction,
    private: true,
  },
  {
    path: '/office/goals',
    component: Goals,
    private: true,
  },
  {
    path: '/office/health-plan/:id',
    component: Onboard,
    private: true,
  },
  {
    path: '/office/health-plan/:health_plan_id/:id/:tab',
    component: HealthPlan,
    private: true,
  },
];

const customerRoutes = [

  {
    path: '/customer/profile',
    component: CustomerProfile,
    private: true,
  },
];

const salesRoutes = [

  {
    path: '/office/clients',
    component: Clients,
    private: true,
  },
  {
    path: '/office/client/:id',
    component: SalesClients,
    private: true,
  }, {
    path: '/office/profile',
    component: Profile,
    private: true,
  },
  {
    path: '/office/dashboard',
    component: Dashboard,
    private: true,
  },
  {
    path: '/office/chats',
    component: Chats,
    private: true,
  },
  {
    path: '/office/health-plan/:id',
    component: Onboard,
    private: true,
  },
  {
    path: '/office/health-plan/:health_plan_id/:id/:tab',
    component: HealthPlan,
    private: true,
  },
];

const careRoutes = [

  {
    path: '/office/clients',
    component: Clients,
    private: true,
  },
  {
    path: '/office/client/:id',
    component: CareManagerClient,
    private: true,
  }, {
    path: '/office/profile',
    component: Profile,
    private: true,
  },
  {
    path: '/office/dashboard',
    component: Dashboard,
    private: true,
  },
  {
    path: '/office/chats',
    component: Chats,
    private: true,
  },
  {
    path: '/office/health-plan/:id',
    component: Onboard,
    private: true,
  },
  {
    path: '/office/health-plan/:health_plan_id/:id/:tab',
    component: HealthPlan,
    private: true,
  },
];

const healthRoutes = [

  {
    path: '/office/clients',
    component: HealthClients,
    private: true,
  },
  {
    path: '/office/client/:id',
    component: HCClient,
    private: true,
  }, {
    path: '/office/profile',
    component: Profile,
    private: true,
  },
  {
    path: '/office/dashboard',
    component: Dashboard,
    private: true,
  },
  {
    path: '/office/chats',
    component: Chats,
    private: true,
  },
  {
    path: '/office/health-plan/:id',
    component: Onboard,
    private: true,
  },
  {
    path: '/office/health-plan/:health_plan_id/:id/:tab',
    component: HealthPlan,
    private: true,
  },
];

const mdRoutes = [

  {
    path: '/office/clients',
    component: MDClients,
    private: true,
  },
  {
    path: '/office/client/:id',
    component: MDClient,
    private: true,
  },
  {
    path: '/office/profile',
    component: Profile,
    private: true,
  },
  {
    path: '/office/dashboard',
    component: Dashboard,
    private: true,
  },
  {
    path: '/office/chats',
    component: Chats,
    private: true,
  },
];

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
      }
}] */
/**
 * @return {void}
 */
export default function RoutesGrit() {
  const {userInfo}: any = useContext(AuthContext);

  let allRoutes = [...commonRoutes];

  if (userInfo && userInfo.user_type === 1) {
    if (userInfo.code === 'admin') {
      allRoutes = allRoutes.concat(officeRoutes);
    } else if (userInfo.code === 'sales_manager') {
      allRoutes = allRoutes.concat(salesRoutes);
    } else if (userInfo.code === 'care_manager') {
      allRoutes = allRoutes.concat(careRoutes);
    } else if (userInfo.code === 'md') {
      allRoutes = allRoutes.concat(mdRoutes);
    } else if (userInfo.code === 'health_coach') {
      allRoutes = allRoutes.concat(healthRoutes);
    }
  } else if (userInfo && userInfo.user_type === 2) {
    allRoutes = allRoutes.concat(customerRoutes);
  }


  return (
    <Router basename={'grit-well/'}>
      <CommonLayout />
      <Switch>

        {allRoutes.map((route: any, i: number) =>
route.private ? (
<PrivateRoute exact path={route.path} key={i}>
        {/* {console.log(route.path, "path")} */}
        <route.component />
</PrivateRoute>
) :

(
<Route exact path={route.path} key={i}>
         <route.component />
</Route>
),
        )}
<Redirect to="/sign-in" ></Redirect>
</Switch>
</Router>
  );
}


