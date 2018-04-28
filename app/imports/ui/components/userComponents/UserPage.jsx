import React, { Component } from 'react';
import UserModal from './UserModal';
import { Meteor } from 'meteor/meteor';
import ListContainer from '../../containers/sharedContainers/ListContainer';
import UserCard from './UserCard';
import UserHeader from './UserHeader';
import SharedMethods from '../../../api/helpers/sharedMethods';

export default class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userModalOpen: false,
      userModalError: {},
      loading: false,
      waitingForCallback: false
    };
  }

  changeModalStatus() {
    this.setState({userModalOpen: !this.state.userModalOpen, userModalError: {}});
  }

  saveNewUser(user) {
    const self = this;
    this.setState({waitingForCallback: true, userModalError: {}});
    Meteor.call('insertNewUser', user, (error) => {
      self.setState({waitingForCallback: false});
      if (error) {
        self.setState({userModalError: error});
      } else {
        self.changeModalStatus();
        self.setState({userModalError: {}});
      }
    });
  }

  renderCard(element) {
    return <UserCard user={element} />;
  }

  renderExtraComponent() {
    return (
      <button type="button" className="btn btn-primary btn-sm" id="newUser"
        onClick={this.changeModalStatus.bind(this)}>
        Nuevo Usuario
      </button>
    );
  }

  getSections() {
    const users = Meteor.users.find({}, {sort: {createdAt: -1}}).fetch();
    const usersSections = {'': users};
    const sections = Object.assign({}, usersSections);
    return sections;
  }

  render() {
    return (
      <div className="container content-body">
        {this.renderExtraComponent()}
        <UserModal
          userModalOpen={this.state.userModalOpen}
          changeModalStatus={this.changeModalStatus.bind(this)}
          saveNewUser={this.saveNewUser.bind(this)}
          userModalError={this.state.userModalError}
        />
        <ListContainer
          subscription={'getUsers'}
          collection={Meteor.users}
          getSections={this.getSections.bind(this)}
          renderCard={this.renderCard.bind(this)}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
