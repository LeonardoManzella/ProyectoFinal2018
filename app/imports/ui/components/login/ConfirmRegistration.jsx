import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import PropTypes from 'prop-types';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

class ConfirmRegistration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      publicKey: '',
      errors: validationsHelper.initializeConfirmRegistrationErrors()
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    this.setState({[targetName]: targetValue});
    let newErrors = this.state.errors;

    if (targetName === 'confirmPassword') {
      if (this.state.password !== targetValue) {
        newErrors[targetName].message = 'notMatchingPasswords';
      } else {
        newErrors[targetName].message = '';
      }
    } else {
      newErrors[targetName].message = '';
    }

    if (targetName === 'publicKey' && targetValue.length !== 42) {
      newErrors[targetName].message = 'invalidPublicKeyLength';
    }

    this.setState(
      {
        errors: newErrors
      }
    );
  }

  submit(event) {
    event.preventDefault();

    const errors = validationsHelper.getProjectErrors(this.state, this.state.errors);
    if (errors.hasErrors) {
      this.setState({errors: errors.newErrors});
      return;
    }

    const {password, publicKey} = this.state;
    const {refcode} = this.props;
    Meteor.call('signupUser', {
      refcode,
      password,
      publicKey
    }, (err, email) => {
      if (err) {
        console.log('There has been an error', err);
        return;
      }
      FlowRouter.go('home');
    });
  }

  render() {
    return <div className="bg-login">
      <nav className="navbar navbar-expand-lgt">
        <div className="container">

          <a className="navbar-brand" href="#">
            <img src="/img/bid-logo-white.png" height="30"/>
          </a>

        </div>
      </nav>

      <div className="container content-body">
        <div className="row">
          <div className="col-md-6 offset-md-3 content-register">
            <img src="/img/bid-logo-grande.png" className="centrado" height="85"/>
            <p className="title-form">{TAPi18n.__('confirmRegistration.title')}</p>
            <form>
              <div className="form-group">
                <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder={TAPi18n.__('confirmRegistration.password')}/>
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(this.state.errors.password.message)}
                </p>
              </div>
              <div className="form-group">
                <input type="password" name="confirmPassword" onChange={this.handleChange} className="form-control" placeholder={TAPi18n.__('confirmRegistration.confirmPassword')}/>
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(this.state.errors.confirmPassword.message)}
                </p>
              </div>
              <div className="form-group">
                <input type="text" name="publicKey" onChange={this.handleChange} className="form-control" placeholder={TAPi18n.__('confirmRegistration.publicKey')}/>
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(this.state.errors.publicKey.message)}
                </p>
              </div>
              <div className="margin-top-30">
                <button type="submit" onClick={this.submit} className="btn btn-primary centrado">{TAPi18n.__('confirmRegistration.enter')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>;
  }
}

ConfirmRegistration.propTypes = {
  refcode: PropTypes.string.isRequired
};

export default ConfirmRegistration;
