import React from 'react'
import {
  Alert,
  Col,
  Grid,
  Row,
} from 'react-bootstrap'

class AppVerifiedMsg extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      resendLinkClicked: false
    }
    this._resendVerificationEmail = this._resendVerificationEmail.bind( this )
  }
  displayPendingUser() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Alert bsStyle="danger">
              { this.linkAvailability() }
            </Alert>
          </Col>
        </Row>
      </Grid>
    )
  }
  linkAvailability() {
    const canSendLink = () => {
      return (
        <p><strong>Please verify your email to continue. </strong>
        <a onClick={ this._resendVerificationEmail } href="#">Resend verification link</a></p>
      )
    }
    const mustWait = () => {
      return (
        <div>Check your email. Link has been set. You can resend in 60 seconds.</div>
      )
    }
    let emailSent = this.state.resendLinkClicked
    console.log('emailsent? ' + emailSent)
    if ( emailSent ) {
      return mustWait()
    } else {
      return canSendLink()
    }
  }
  render() {
    const { loggedIn, emailVerified } = this.props
    if ( loggedIn && !emailVerified ) {
        return ( this.displayPendingUser() )
    } else {
        return ( <div></div> )
    }
  }
  _resendVerificationEmail( event ) {
    event.preventDefault()
    const { resendVerificationEmail } = this.props
    this.setState({ resendLinkClicked: true })
    resendVerificationEmail()
    // user can click link after 60 seconds
    const resetState = () => {
      this.setState({ resendLinkClicked: false })
      console.log( this.state.resendLinkClicked )
    }
    setTimeout( resetState, 60000 )
  }
}

export default AppVerifiedMsg
