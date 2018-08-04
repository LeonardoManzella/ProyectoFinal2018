import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Login extends React.Component {

  cleanData(loginDropdownOpen, register) {
    this.setState({
      loginDropdownOpen,
      email: '',
      password: '',
      repeatPassword: '',
      error: '',
      register
    });
  }

  renderActionButtons() {
    if (this.state.register) {
      return (
        <div className="dropdown-row">
          <button 
            type="submit"
            onClick={this.register.bind(this)}
            className="pink-button"
          >
            {TAPi18n.__('login.enter')}
          </button>
          <button
            className="pink-button secondary"
            onClick={() => this.cleanData(true, false)}
          >
            Volver Atrás
          </button>
        </div>
      );
    }
    return (
      <div className="dropdown-row">
        <button 
          type="submit"
          onClick={this.submit}
          className="pink-button"
        >
          {TAPi18n.__('login.enter')}
        </button>
        <button
          className="pink-button secondary"
          onClick={() => this.cleanData(true, true)}
        >
          Registrar
        </button>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      loginDropdownOpen: false,
      email: '',
      password: '',
      repeatPassword: '',
      error: '',
      register: false
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

  register(event) {
    event.preventDefault();
    const {email, password, repeatPassword} = this.state;
    if (!email || email === '' || !password || password === '' ||
      !repeatPassword || repeatPassword === ''
    ) {
      this.setState( {error: TAPi18n.__('error.login')} );
      return;
    }
    if (password !== repeatPassword) {
      this.setState( {error: 'Las contraseñas deben coincidir'} );
      return;
    }
    Meteor.call('insertNewUser', { email, password, repeatPassword }, (err) => {
      if (err) {
        console.log(err)
        this.setState(
          {error: 'error'}
        );
      } else {
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
    });
  }

  render() {
    return (
      <Dropdown
        isOpen={this.state.loginDropdownOpen}
        toggle={() => this.cleanData(!this.state.loginDropdownOpen, false)}
      >
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={this.state.loginDropdownOpen}
        >
          <a>LOGIN</a>
        </DropdownToggle>
        <DropdownMenu
          right
        >
          <div className="dropdown-title">
            { this.state.register ? 'REGISTRAR' : 'LOGIN' }
          </div>
          <div className="dropdown-body">
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} 
              className='dropdown-input'
              placeholder={TAPi18n.__('login.email')}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange} 
              className='dropdown-input'
              placeholder={TAPi18n.__('login.password')}
            />
            {
              this.state.register ?
                <input
                  type="password"
                  name="repeatPassword"
                  value={this.state.repeatPassword}
                  onChange={this.handleChange} 
                  className='dropdown-input'
                  placeholder='Repetir Contraseña'
                />
                : ''
            }
          </div>
          <p className='small italic-proyectos text-danger'>
            {this.state.error}
          </p>
          {this.renderActionButtons()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Login;
