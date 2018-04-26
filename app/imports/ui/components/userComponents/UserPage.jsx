import React, { Component } from 'react';
import UserModal from './UserModal';
import { Meteor } from 'meteor/meteor';
import ListContainer from '../../containers/sharedContainers/ListContainer';
import UserCard from './UserCard';
import UserHeader from './UserHeader';
import SharedMethods from '../../../api/helpers/sharedMethods';
import Loading from '../sharedComponents/Loading';

export default class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userModalOpen: false,
      userModalError: {},
      filterMenuOptions: SharedMethods.intializeFilterMenuOptions(),
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

  handleMenuInput(event) {
    const { filterMenuOptions } = this.state;
    filterMenuOptions[event.target.name] = event.target.value;
    this.setState({filterMenuOptions});
  }

  handleMenuDate(value, date) {
    const { filterMenuOptions } = this.state;
    filterMenuOptions[date] = value;
    this.setState({filterMenuOptions});
  }

  getSections() {
    const userIds = SharedMethods.getUsersFilter(this.state.filterMenuOptions.search);
    const searchExpression = {_id: {$in: userIds}};
    const filterExpression = SharedMethods.getFilterExpression('personalInformation.status',
      this.state.filterMenuOptions.filter);
    const dateExpression = SharedMethods.getDateFilterExpression('createdAt',
      this.state.filterMenuOptions.startDate, this.state.filterMenuOptions.endDate);
    const users = Meteor.users.find({ $and: [ searchExpression, dateExpression,
      filterExpression]}, {sort: {createdAt: -1}}).fetch();
    const usersSections = {'': users};
    const sections = Object.assign({}, usersSections);
    return sections;
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="container content-body">
        <UserModal
          userModalOpen={this.state.userModalOpen}
          changeModalStatus={this.changeModalStatus.bind(this)}
          saveNewUser={this.saveNewUser.bind(this)}
          userModalError={this.state.userModalError}
        />
        <UserHeader
          changeModalStatus={this.changeModalStatus.bind(this)}
          handleMenuInput={this.handleMenuInput.bind(this)}
          handleMenuDate={this.handleMenuDate.bind(this)}
          filterMenuOptions={this.state.filterMenuOptions}
        />
        <ListContainer
          subscription={'getUsers'}
          collection={Meteor.users}
          getSections={this.getSections.bind(this)}
          renderCard={this.renderCard.bind(this)}
        />
        {this.state.waitingForCallback ? <Loading /> : ''}
      </div>
    );
  }
}
