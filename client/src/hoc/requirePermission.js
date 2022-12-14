import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentUser,
  getIsSignedIn,
  getDefaultPath,
} from '../redux/selectors';
import { setAttemptedPath } from '../redux/actions/authActions';

import {withRouter} from 'react-router-dom';

/**
 * If the current user is admin or root, he/she is authorized by default.
 * If the current user is normal user, then check his/her permssions.
 * After checking, if he/she is not authorized, redirect to default path.
 *
 * @param {Component} WrappedComponent The component to be wrapped
 * @param {string} action The action (see state.auth.permissions)
 */
const requirePermission = action => (WrappedComponent) => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    isAuthorized = () => {
      // eslint-disable-next-line react/prop-types
      const { currentUser, isSignedIn, currentPath } = this.props;
      if (!isSignedIn) {
        this.setAttemptedPath(currentPath);
        return false;
      }

      if (currentUser.role === 'root' || currentUser.role === 'admin') {
        return true;
      }

      if (currentUser.pemissions[action]) {
        return true;
      }

      return false;
    };

    shouldNavigateAway = () => {
      if (!this.isAuthorized()) {
        this.props.history.replace(this.props.defaultPath);
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    currentUser: getCurrentUser(state),
    isSignedIn: getIsSignedIn(state),
    defaultPath: getDefaultPath(state),
    currentPath: state.router.location.pathname,
  });

  return connect(mapStateToProps, { setAttemptedPath })(withRouter(ComposedComponent));
};

export default requirePermission;
