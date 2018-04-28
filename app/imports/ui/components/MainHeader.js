import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TAPi18n } from 'meteor/tap:i18n';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SharedMethods from '../../api/helpers/sharedMethods';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

class MainHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

  }

  getUserName() {
    return SharedMethods.getUsersFullName(this.props.user);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getTabSelected(tab, redirect) {
    let tabClass = "nav-item";
    let tabSpan = "";
    const isTabSelected = this.props.currentUrl === redirect || 
      (tab === 'Tareas' && this.props.currentUrl.indexOf(redirect) !== -1)
      || (tab === 'Bitácora' && this.props.currentUrl.indexOf(redirect) !== -1)
      || (tab === 'Experto' && this.props.currentUrl.indexOf(redirect) !== -1)
      || (tab === 'Usuarios' && this.props.currentUrl.indexOf(redirect) !== -1);

    if (isTabSelected) {
      tabClass = "nav-item active";
      tabSpan = <span className="sr-only"></span>;
    }

    return (
      <li className={tabClass}>
        <a className="nav-link" href="" onClick={() => FlowRouter.go(redirect)}>
          {tab}
          {tabSpan}
        </a>
      </li>
    );
  }

  logout() {
    this.toggle();
    Meteor.logout((error) => {
      if (!error) {
        FlowRouter.go('login');
      }
    });
  }

  render() {
    const { user, loading } = this.props;
    if (loading) {
      return <div />;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="" onClick={() => FlowRouter.go('home')}>
            <img src="/img/emprendimientos-logo.png" height="30"/>
          </a>

          <div className="collapse navbar-collapse margin-left-20" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              {this.getTabSelected('Home', '/')}
              {this.getTabSelected('Tareas', '/tasksBoard')}
              {this.getTabSelected('Bitácora', '/binnacle')}
              {this.getTabSelected('Experto', '/expert')}
              {this.getTabSelected('Usuarios', '/usersList')}
            </ul>
          </div>
          
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag="span"
              onClick={this.toggle}
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
            >
              <a>
                <span className="navbar-text dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="/img/avatar-jp.svg" height="30" className="avatar-jefe"/> {this.getUserName()}
                </span>
              </a>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => {this.toggle(); FlowRouter.go('profile');}}>{TAPi18n.__('userProfile.myProfile')}</DropdownItem>
              <DropdownItem onClick={this.logout.bind(this)}>{TAPi18n.__('layoutMenu.logout')}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    );
  }
}

MainHeader.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  currentUrl: PropTypes.string
};

export default MainHeader;

