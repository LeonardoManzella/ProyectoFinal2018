import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';
import { getRolesByUser } from '../../../api/helpers/rolesByUser';
import { validationsHelper } from '../../../api/helpers/validationsHelper';

export default class ModalUserTab extends Component {

  getUserRoleOptions() {
    const roles = Object.assign([], getRolesByUser());
    if (this.props.defaultRole && !roles.find((it) => it === this.props.defaultRole)) roles.push(this.props.defaultRole);
    return roles.map((role, index) => (
      <option key={index} value={role}> {TAPi18n.__(`user.roles.${role}`)}</option>
    ));
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div className="container pl-0 margin-top-30">
          <div className="row">
            <div className="col">
              <p className="small italic-proyectos">{TAPi18n.__('modal.userRole')}</p>
              <div className="form-group form-users">
                <select className="form-control form-control-sm"
                  defaultValue={this.props.defaultRole}
                  id='roleUser' name='role' onChange={this.props.handleInputChange.bind(this)} disabled={this.props.defaultRole}>
                  <option>Todos</option>
                  {this.getUserRoleOptions()}
                </select>
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(errors.role.message)}
                </p>
              </div>
            </div>
            <div className="col">
              <div className="form-users">
                <p className="small italic-proyectos">{TAPi18n.__('modal.name')}</p>
                <input className="form-control form-control-sm" type="text"
                  id='nameUser' name='name' onChange={this.props.handleInputChange.bind(this)}/>
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(errors.name.message)}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-users">
                <p className="small italic-proyectos">{TAPi18n.__('modal.lastName')}</p>
                <input className="form-control form-control-sm" type="text"
                  id='surnameUser' name='surname' onChange={this.props.handleInputChange.bind(this)} />
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(errors.surname.message)}
                </p>
              </div>
            </div>
            <div className="col">
              <div className="form-users">
                <p className="small italic-proyectos">{TAPi18n.__('modal.phoneNumber')}</p>
                <input className="form-control form-control-sm" type="text"
                  id='phoneUser' name='phone' onChange={this.props.handleInputChange.bind(this)} />
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(errors.phone.message)}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-users">
                <p className="small italic-proyectos">{TAPi18n.__('modal.email')}</p>
                <input className="form-control form-control-sm" type="text"
                  id='emailUser' name='email' onChange={this.props.handleInputChange.bind(this)} />
                <p className='small italic-proyectos text-danger'>
                  {validationsHelper.getErrorMessage(errors.email.message)}
                </p>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

ModalUserTab.propTypes = {
  defaultRole: PropTypes.string,
  handleInputChange: PropTypes.func,
  errors: PropTypes.object
};
