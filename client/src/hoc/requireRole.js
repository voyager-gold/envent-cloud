import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentUser,
  getIsSignedIn,
  getDefaultPath,
} from '../redux/selectors';
import { setAttemptedPath } from '../redux/actions/authActions';
import { tryLocalSignIn } from '../redux/actions/authActions';

import {withRouter} from 'react-router-dom';

/**
 * If role == "user", then user, admin and root are authorized
 * If role == "admin", then admin and root are authorized
 * If role == "root", then only root are authorized
 * After checking, if he/she is not authorized, redirect to default path.
 *
 * @param {Component} WrappedComponent The component to be wrapped
 * @param {string} role The role. It could be ['user', 'admin', 'root']
 */
const requireRole = role => (WrappedComponent) => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      // tryLocalSignIn();
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    isAuthorized = () => {
      // eslint-disable-next-line react/prop-types
      console.log('requireRole:',this.props);

      const { currentUser, isSignedIn } = this.props;
      if (!isSignedIn) {

        this.props.setAttemptedPath(this.props.currentPath);
        return false;
      }

      if (role === 'user') {
        // user, admin and root is allowed
        return true;
      } if (role === 'admin') {
        // admin and root is allowed
        if (currentUser.role === 'admin' || currentUser.role === 'root') {
          return true;
        }
      } else if (role === 'root') {
        // only root is allowed
        if (currentUser.role === 'root') {
          return true;
        }
      }

      return false;
    };

    shouldNavigateAway = () => {
      console.log('requireRole shouldNavigateAway');
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

export default requireRole;
