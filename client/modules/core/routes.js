import React from 'react';
import { mount } from 'react-mounter';
import { LayoutSplit, LayoutList, AppNotFound } from '/client/configs/components';
import AccountRegister from './containers/account_register';
import AccountLogin from './containers/account_login';
import AccountPasswordReset from './containers/account_password_reset';
import AccountPreferences from './containers/account_preferences';

export default function (injectDeps, { FlowRouter }) {
  const LayoutSplitCtx = injectDeps(LayoutSplit);
  const LayoutListCtx = injectDeps(LayoutList);

  FlowRouter.route('/register', {
    name: 'accounts.register',
    action() {
      mount(LayoutSplitCtx, {
        content: () => (<AccountRegister />),
      });
    },
  });

  FlowRouter.route('/login', {
    name: 'accounts.login',
    action() {
      mount(LayoutSplitCtx, {
        content: () => (<AccountLogin />),
      });
    },
  });

  FlowRouter.route('/user/:username/preferences', {
    name: 'accounts.preferences',
    action() {
      mount(LayoutListCtx, {
        content: () => (<AccountPreferences />),
      });
    },
  });
  FlowRouter.route('/verify-email/:token', {
    name: 'verify-email',
    action(params) {
      Accounts.verifyEmail(params.token, (error) => {
        if (error) {
          // Bert.alert( error.reason, 'danger' )
        } else {
          FlowRouter.go('/');
          // Bert.alert( 'Email verfied! Thanks!', 'success' )
        }
      });
    },
  });
  FlowRouter.route('/reset-password/:token', {
    name: 'reset-password',
    action(params) {
      mount(LayoutListCtx, {
        content: () => (<AccountPasswordReset token={params.token} />),
      });
    },
  });
  /* eslint-disable no-param-reassign */
  FlowRouter.notFound = {
    name: 'app.notFound',
    action() {
      mount(LayoutListCtx, {
        content: () => (<AppNotFound />),
      });
    },
  };
}
