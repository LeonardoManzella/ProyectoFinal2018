import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';
import SharedMethods from '../../../api/helpers/sharedMethods';

export default class UserCard extends Component {

  render() {
    const { user } = this.props;
    if (!(user && user.personalInformation)) {
      return '';
    }
    let statusClass = "content-actividad";
    let pendingSpan = "";
    if (user.personalInformation.status === 'pending') {
      statusClass = "content-actividad pending-audit";
      pendingSpan = (
        <div className="col-md-3 col-xs-12">
          <span className="badge badge-pill badge-secondary">{TAPi18n.__('status.pending')}</span>
        </div>
      );
    }
    return (
      <div>
        <div className={statusClass}>
          <div className="row">
            <div className="col-md-1 col-xs-12">
              <img src="/img/avatar.png" height="50" />
            </div>
            <div className="col-md-10 col-xs-12">

              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <p className="small italic-proyectos">{TAPi18n.__('user.roles.' + user.roles[0])}</p>
                  <p className="name user-text">{SharedMethods.getUsersFullName(user)}</p>
                </div>
                <div className="col-md-3 col-xs-12">
                  <p className="small italic-proyectos">{TAPi18n.__('phone')}</p>
                  <p className="user-text">{user.personalInformation.phone}</p>
                </div>
                <div className="col-md-3 col-xs-12">
                  <p className="small italic-proyectos">{TAPi18n.__('contactUser')}</p>
                  <p className="email user-text">
                    {user.emails ? user.emails[0].address : ''}
                  </p>
                </div>
                {pendingSpan}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object
};
