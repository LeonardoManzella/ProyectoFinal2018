import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SharedMethods from '../../../api/helpers/sharedMethods';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
import activitiesHelper from '../../../api/helpers/activitiesHelper';
import ConfirmModal from '../sharedComponents/ConfirmModal';
import Loading from '../sharedComponents/Loading';

class ActivityCard extends Component {

  constructor(props) {
    super(props);
    const stateParams = {};
    if (props.activity && props.activity.stateParamsNames) {
      props.activity.stateParamsNames.map((param, index) => {
        if (param === props.activity.modalName) {
          stateParams[param] = props.activity.stateParams[index] === "true";
        } else {
          stateParams[param] = props.activity.stateParams[index];
        }
      });
    }
    this.state = {
      confirmModalOpen: false,
      reconfirmModalOpen: false,
      stateParams,
      waitingForCallback: false
    };
  }

  changeLoadingStatus() {
    this.setState({waitingForCallback: !this.state.waitingForCallback});
  }

  getUserIcon(type, user) {
    if ((type === 'global' || type === 'user') && user === 'activityNames.BID') {
      return '/img/bid-logo.png';
    }
    return '/img/avatar.png';
  }

  getUser(user, type) {
    if (!user) {
      return '';
    }
    if (type === 'global' || type === 'user') {
      if (user === 'activityNames.BID') {
        return TAPi18n.__(user);
      }
      return user;
    }
    return SharedMethods.getUsersFullName(Meteor.users.findOne({_id: user}));
  }

  getModalDescriptionItems(activity) {
    const user = Meteor.users.findOne({_id: activity.pendingUserId});
    if (!user) {
      return '';
    }
    return [{
      title: 'Nombre',
      description: SharedMethods.getUsersFullName(user)
    }, {
      title: 'Email',
      description: user.emails[0].address
    }, {
      title: 'Rol',
      description: TAPi18n.__(`user.roles.${user.roles[0]}`)
    }, {
      title: 'Public Key',
      description: user.personalInformation.publicKey
    }];
  }

  getUserAction(action) {
    if (action) {
      return ' ' + TAPi18n.__(action);
    }
    return '';
  }

  getStatus(status) {
    if (status === 'notObjected') {
      return <span className="green">{' ' + TAPi18n.__('acquisitionPlanNames.notObjectedButton')}</span>;
    } else if (status === 'objected') {
      return <span className="text-danger">{' ' + TAPi18n.__('acquisitionPlanNames.objectedButton')}</span>;
    } else if (status === 'accepted') {
      return (
        <span><span className="green">{' ' + TAPi18n.__('activityNames.accepted')}</span>
          {' ' + TAPi18n.__('activityNames.invitation')}</span>
      );
    } else if (status === 'rejected') {
      return <span><span className="text-danger">{' ' + TAPi18n.__('activityNames.rejected')}</span>
        {' ' + TAPi18n.__('activityNames.invitation')}</span>;
    } if (status === 'adjudged') {
      return <span className="green">{' ' + TAPi18n.__('biddings.selectProvider')}</span>;
    } else if (status === 'notAdjudged') {
      return <span className="text-danger">{' ' + TAPi18n.__('biddings.notSelectProvider')}</span>;
    }
    return '';
  }

  getDescription(description, index) {
    if (description) {
      return (
        <div key={index}>
          <img src="/img/icon_proyecto.svg" height="25" className="img-files" />
          <p className="texto-principal">{description}</p>
        </div>
      );
    }
    return '';
  }

  getDate(createdAt) {
    return moment(createdAt).format('LLL');
  }

  getHash(hash) {
    if (hash) {
      return <p className="small hash-activity italic-proyectos"> {TAPi18n.__('acquisitionPlanNames.hash') + ': '}
        <a href="" target="_blank" rel="noopener noreferrer">
          {'#' + hash}
        </a>
      </p>;
    }
    return '';
  }

  getImage(status) {
    if (status && status === 'pending') {
      return "/img/pending.svg";
    }
    return "/img/datos-proyectos.svg";
  }

  getPendingClass(status) {
    if (status && status === 'pending') {
      return " pending-audit";
    }
    return "";
  }

  changeModalStatus(modal) {
    const { stateParams } = this.state;
    stateParams[modal] = !this.state.stateParams[modal];
    this.setState({stateParams});
  }

  getHeader(activity) {
    if (activity.status === 'pending' && !Meteor.userId()) {
      const message = activity.actionDescription === 'activityNames.payment' ?
        TAPi18n.__('activityNames.paymentPending') :
        TAPi18n.__('activityNames.pending');
      return (
        <span className="badge badge-pill badge-secondary">
          {message}
        </span>
      );
    }
    if (activity.status === 'pending') {
      return (
        <span className="badge badge-pill badge-secondary">
          {TAPi18n.__('activityNames.pending')}
        </span>
      );
    }
    return (
      <p className="small">
        <img src={this.getUserIcon(activity.type, activity.createdBy)} height="25" className="avatar-jefe"/>
        <strong>{this.getUser(activity.createdBy, activity.type)}</strong>
        {this.getUserAction(activity.actionDescription)}
        {this.getStatus(activity.status)}
      </p>
    );
  }

  redirect(activity) {
    if (activity.type === 'pendingUser') {
      this.setState({
        confirmModalOpen: true
      });
    } else if (activity.redirect) {
      let params = {};
      let queryParams = {};
      if (activity.paramsKeys) {
        activity.paramsKeys.map((paramKey, index) => {
          params[paramKey] = activity.paramsValues[index];
        });
      }
      if (activity.queryParamsKeys) {
        activity.queryParamsKeys.map((queryParamsKey, index) => {
          queryParams[queryParamsKey] = activity.queryParamsValues[index];
        });
      }
      FlowRouter.go(activity.redirect, params, queryParams);
    } else if (activity.modalAction) {
      this.changeModalStatus(activity.modalName);
    } else {
      console.log('No action specified');
    }
  }

  renderModal(activity) {
    if (!activity.modalAction) {
      return '';
    }
    const activityParams = {};
    activity.activityParamsNames.map((param, index) => {
      activityParams[param] = activity.activityParams[index];
    });
    return activitiesHelper[activity.modalAction](activityParams, this.state.stateParams,
      this.changeModalStatus.bind(this), this.changeLoadingStatus.bind(this));
  }

  renderConfirmModal(confirmModalOpen, reconfirmModalOpen, activity) {
    return (
      <div>
        <ConfirmModal
          modalLabel={TAPi18n.__('user.user')}
          onAccept={() => {
            this.setState({
              reconfirmModalOpen: true
            });
          }}
          onCancel={() => {
            this.setState({
              confirmModalOpen: false
            });
          }}
          modalDescriptionItems={this.getModalDescriptionItems(activity)}
          confirmModalOpen={confirmModalOpen}
          showCancelButton={true}
          prefix={TAPi18n.__('pendingUserModal.this')}
        />
        <ConfirmModal
          modalLabel={TAPi18n.__('user.user')}
          onAccept={() => {
            this.setState({
              reconfirmModalOpen: false,
              confirmModalOpen: false
            });
          }}
          onCancel={() => {
            this.setState({
              reconfirmModalOpen: false,
              confirmModalOpen: false
            });
          }}
          modalDescription={TAPi18n.__('pendingUserReconfirmationModal.description')}
          confirmModalOpen={reconfirmModalOpen}
          showCancelButton={true}
          isReconfirm= {true}
          prefix={TAPi18n.__('pendingUserReconfirmationModal.this')}
        />
      </div>
    );
  }

  getCommentClass(activity) {
    if (activity.actionDescription === "comments.commentAdded") {
      return "titulo-comentario";
    }
    return "titulo-plan";
  }

  render() {
    const {activity} = this.props;
    const {confirmModalOpen, reconfirmModalOpen} = this.state;

    if (this.state.waitingForCallback) {
      return <Loading />;
    }

    return (
      <div>
        <div className={"content-actividad" + this.getPendingClass(activity.status)}>
          <div className="row">
            <div className="col-md-1 col-xs-12">
              <img src={this.getImage(activity.status)} height="50" className="img-act" />
            </div>
            <div className="col-md-9 col-xs-12">
              {this.getHeader(activity)}
              <h5 className={this.getCommentClass(activity)}>
                <a onClick={() => this.redirect(activity)}>
                  {activity.extraTitle ? TAPi18n.__(activity.extraTitle) + ' ' : ''}
                  {activity.title}
                  {activity.postTitle ? ': ' + TAPi18n.__(activity.postTitle) : ''}
                </a>
              </h5>
              {
                activity.descriptions ?
                  activity.descriptions.map((description, index) => this.getDescription(description, index))
                  : ''
              }
              <div>
                <p className="small date-activity">
                  {this.getDate(activity.createdAt)} {TAPi18n.__('hours')}
                </p>
              </div>
              <div>
                {this.getHash(activity.hash)}
              </div>
            </div>
          </div>
        </div>
        {this.renderModal(activity)}
        {activity.type !== 'pendingUser' || Meteor.userId() !== activity.createdBy ? '' :
          this.renderConfirmModal(confirmModalOpen, reconfirmModalOpen, activity)}
      </div>
    );
  }
}

ActivityCard.propTypes = {
  activity: PropTypes.object
};

export default ActivityCard;

