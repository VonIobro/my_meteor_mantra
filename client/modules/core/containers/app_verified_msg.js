import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/app_verified_msg';
import { authComposer } from 'meteor-auth';

export const composer = ({ context }, onData) => {
  onData(null, { });
};

export const depsMapper = (context, actions) => ({
  resendVerificationEmail: actions.accounts.resendVerificationEmail,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(Component);
