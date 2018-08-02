import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginDropdownOpen: false,
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
      <Dropdown
        isOpen={this.state.loginDropdownOpen}
        toggle={() => this.setState({loginDropdownOpen: !this.state.loginDropdownOpen})}
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
          <div>
            <input
              type="text"
              name="email"
              onChange={this.handleChange} 
              className='dropdown-input'
              placeholder={TAPi18n.__('login.email')}
            />
            <input
              type="password"
              name="password"
              onChange={this.handleChange} 
              className='dropdown-input'
              placeholder={TAPi18n.__('login.password')}
            />
          </div>
          <p className='small italic-proyectos text-danger'>
            {this.state.error}
          </p>
          <div className="dropdown-row">
            <button 
              type="submit"
              onClick={this.submit}
              className="pink-button"
            >{TAPi18n.__('login.enter')}</button>
            <button className="pink-button">Registrar</button>
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}


export default Login;
