import React from 'react';
import { AppErrorMsg, AuthCheck } from '/client/configs/components';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

class CommentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this._createComment = this._createComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }
  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }
  _createComment(event) {
    event.preventDefault();
    const { create, postId, user } = this.props;
    const { comment } = this.state;
    create( user.id, user.username, postId, comment);
    this.setState({ comment: '' });
  }
  render() {
    const { error } = this.props;
    return (
      <AuthCheck>
        <form onSubmit={this._createComment}>
          <AppErrorMsg error={error} />
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Your comment...."
              value={this.state.comment}
              onChange={this.handleCommentChange}
            />
          </FormGroup>
          <Button type="submit">Add Comment</Button>
        </form>
      </AuthCheck>
    );
  }
}

export default CommentCreate;

CommentCreate.propTypes = {
  create: React.PropTypes.func,
  postId: React.PropTypes.string,
  error: React.PropTypes.string,
  user: React.PropTypes.object,
};
