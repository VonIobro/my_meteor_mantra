import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/post_create';
import { authComposer } from 'meteor-auth';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState, Users } = context();
  const errorState = 'POSTS_CREATE_ERROR';
  const error = LocalState.get(errorState);

  onData(null, { error, Users });

  return clearErrors.bind(errorState);
};

export const depsMapper = (context, actions) => ({
  create: actions.posts.create,
  clearErrors: actions.posts.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(Component);
