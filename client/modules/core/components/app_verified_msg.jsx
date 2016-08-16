import React from 'react';
import { AuthEnsureUser } from '/client/configs/components';
import { Alert, Col, Grid, Row } from 'react-bootstrap';

export default class AppVerifiedMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resendLinkClicked: false,
    };
    this._resendVerificationEmail = this._resendVerificationEmail.bind(this);
  }
  _resendVerificationEmail() {
    this.setState({ resendLinkClicked: true });
    this.props.resendVerificationEmail();
    // user can click link after 60 seconds
    const resetState = () => {
      this.setState({ resendLinkClicked: false });
      console.log(this.state.resendLinkClicked);
    };
    /* TODO this is stupid */
    setTimeout(resetState, 60000);
  }
  linkAvailability() {
    const canSendLink = () => (
      <p><strong>Please verify your email to continue. </strong>
        <a onClick={this._resendVerificationEmail} href="#">Resend verification link</a>
      </p>
    );
    const mustWait = () => (
      <div>Check your email. Link has been set. You can resend in 60 seconds.</div>
    );
    const emailSent = this.state.resendLinkClicked;
    if (emailSent) { return mustWait(); }
    return canSendLink();
  }
  displayPendingUser() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Alert bsStyle="danger">
              {this.linkAvailability()}
            </Alert>
          </Col>
        </Row>
      </Grid>
    );
  }
  displayGuest() {
    return (
      <div></div>
    );
  }
  render() {
    return (
      <AuthEnsureUser
        unverifiedMessage={this.displayPendingUser()}
        guestMessage={this.displayGuest()}
      >
      </AuthEnsureUser>
    );
  }
}

AppVerifiedMsg.propTypes = {
  resendVerificationEmail: React.PropTypes.func,
};
