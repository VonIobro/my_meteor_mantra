import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { authComposer } from '/client/configs/composers';
import Component from '../components/comment_create';

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('CREATE_COMMENT_ERROR');

  onData(null, { error });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.comments.create,
  clearErrors: actions.comments.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(Component);
