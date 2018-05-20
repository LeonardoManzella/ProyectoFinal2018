import React from 'react';
import Header from '../sharedComponents/Header';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';
import { userStatus } from '../../../api/helpers/status';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

const renderNewUserButton = (changeModalStatus) => {
  if (Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['administrator', 'executiveDirector'])) {
    return (
      <button type="button" className="btn btn-primary btn-sm" id="newUser"
        onClick={changeModalStatus}>
        {TAPi18n.__('user.new')}
      </button>
    );
  }
  return '';
};

const renderTitle = (changeModalStatus) => (
  <div className="col margin-bottom-20">
    <h4 className="title-page">Usuarios</h4>
    {renderNewUserButton(changeModalStatus)}
  </div>
);

const UserHeader = ({changeModalStatus, handleMenuInput, handleMenuDate,
  filterMenuOptions}) => (
  <Header
    renderTitle={() => renderTitle(changeModalStatus)}
    handleMenuInput={handleMenuInput}
    options={userStatus}
    handleMenuDate={handleMenuDate}
    filterMenuOptions={filterMenuOptions}
    filterName={TAPi18n.__('filterMenu.byStatus')}
  />
);

UserHeader.propTypes = {
  changeModalStatus: PropTypes.func,
  handleMenuInput: PropTypes.func,
  handleMenuDate: PropTypes.func,
  filterMenuOptions: PropTypes.object
};

export default UserHeader;

