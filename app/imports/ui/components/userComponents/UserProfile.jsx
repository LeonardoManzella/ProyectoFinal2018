import React from 'react';
import { Meteor } from 'meteor/meteor';
import { UserProfileView } from './UserProfileView';
import { UserProfileEdit } from './UserProfileEdit';
import { Roles } from 'meteor/alanning:roles';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  getFields() {
    const showResume = Meteor.user() &&
     Roles.userIsInRole(Meteor.userId(), ['provider']);

    if (this.state.edit) {
      return (
        <UserProfileEdit
          changeEdit = {this.changeEdit.bind(this)}
          showResume = {showResume}
        />
      );
    } else {
      return (
        <UserProfileView
          changeEdit = {this.changeEdit.bind(this)}
          showResume = {showResume}
        />
      );
    }
  }

  changeEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  render() {
    return (
      <div>
        {this.getFields()}
      </div>
    );
  }
}

export default UserProfile;
