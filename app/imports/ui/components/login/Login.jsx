import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, error: ''});
  }

  submit(event) {
    event.preventDefault();
    const {email, password} = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        validationsHelper.displayServerError(err);
        this.setState(
          {error: TAPi18n.__('error.login')}
        );
      } else {
        FlowRouter.go('home');
      }
    });
  }

  render() {
    return (
      <div className="login login-container">
        <div className="row">
          <div className="col-md-6 offset-md-3 content-register">
            <img src="/img/emprendimientos-logo.png" className="centrado" height="85"/>
            <p className="title-form">{TAPi18n.__('login.signIn')}</p>
            <form>
              <div className="form-group">
                <input type="text" name="email" onChange={this.handleChange} className="dropdown-input" placeholder={TAPi18n.__('login.email')}/>
              </div>
              <div className="form-group">
                <input type="password" name="password" onChange={this.handleChange} className="dropdown-input" placeholder={TAPi18n.__('login.password')}/>
              </div>
              <p className='small italic-proyectos text-danger'>
                {this.state.error}
              </p>
              <div className="margin-top-30">
                <button type="submit" onClick={this.submit} className="transparent-button centrado">{TAPi18n.__('login.enter')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default Login;
