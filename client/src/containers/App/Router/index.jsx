import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import Landing from '../../Landing/index';
import NotFound404 from '../../DefaultPage/404/index';
import LockScreen from '../../Account/LockScreen/index';
import LogIn from '../../Account/LogIn/index';
import LogInPhoto from '../../Account/log_in_photo/index';
import Register from '../../Account/Register/index';
import RegisterPhoto from '../../Account/RegisterPhoto/index';
import WrappedRoutes from './WrappedRoutes';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path="/lock_screen" component={LockScreen} />
        <Route path="/login" component={LogIn} />
        <Route path="/login_photo" component={LogInPhoto} />
        <Route path="/register" component={Register} />
        <Route path="/register_photo" component={RegisterPhoto} />
        <Route path="/" component={WrappedRoutes} />
        <Route path="/404" component={NotFound404} />
        <Route exact path="/" component={Landing} />
        <Redirect to="/login" />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
