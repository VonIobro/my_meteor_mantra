import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { authComposer } from 'meteor-auth';
import Component from '../components/layout_split';

export const composer = ({ context }, onData) => {
  const { Users } = context();
  const { emailVerified } = Users();

  onData(null, { emailVerified });
};

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps()
)(Component);
