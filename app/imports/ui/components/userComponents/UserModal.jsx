import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';
import Modal from 'react-modal';
import ModalUserTab from '../sharedComponents/ModalUserTab';
import { getRolesByUser } from '../../../api/helpers/rolesByUser';
import { Meteor } from 'meteor/meteor';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import ConfirmModal from '../../components/sharedComponents/ConfirmModal';

export default class UserModal extends Component {

  constructor(props) {
    super(props);
    const userDataErrors = validationsHelper.initializeUserErrors();
    this.state = {
      userData: {
        name: '',
        role: '',
        surname: '',
        phone: '',
        email: '',
        status: 'pending'
      },
      userDataErrors,
      confirmModalOpen: false,
      reconfirmModalOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userModalError && Object.keys(nextProps.userModalError).length !== 0) {
      this.setState({
        userDataErrors: validationsHelper.checkServerError(nextProps.userModalError,
          this.state.userDataErrors)
      });
    } else {
      this.setState({
        userDataErrors: validationsHelper.initializeUserErrors()
      });
    }
  }

  handleInputChange(event) {
    const { userData, userDataErrors } = this.state;
    userDataErrors[event.target.name].message = '';
    userData[event.target.name] = event.target.value;
    this.setState({userData, userDataErrors});
  }

  saveNewUser(user) {
    const userData = {};
    /*if (Meteor.user().roles[0] === 'executiveDirector') {
      userData.executiveUnitId = Meteor.user().executiveUnitId;
    }*/
    this.props.saveNewUser(Object.assign(userData, user));
  }

  openConfirmModal() {
    const userErrors = validationsHelper.getProjectErrors(this.state.userData, this.state.userDataErrors);
    if (userErrors.hasErrors) {
      this.setState({
        userDataErrors: userErrors.newErrors
      });
      return;
    }
    this.setState({confirmModalOpen: true});
  }

  render() {
    const { userModalOpen, changeModalStatus } = this.props;

    return (
      <div>
        <ConfirmModal
          modalLabel={TAPi18n.__('user.user')}
          onAccept={() => {
            this.saveNewUser(Object.assign({}, this.state.userData));
            this.setState({
              confirmModalOpen: false
            });
          }}
          onCancel={() => {
            this.setState({
              confirmModalOpen: false
            });
          }}
          modalDescriptionItems={[
            {title: TAPi18n.__('user.new'),
              description: this.state.userData.name}]}
          confirmModalOpen={this.state.confirmModalOpen}
          showCancelButton={true}
          prefix={TAPi18n.__('pendingUserModal.one')}
        />
        <Modal
          isOpen={userModalOpen}
          contentLabel="Modal"
          className={{
            base: '',
            afterOpen: 'modal fade bottom show plan',
            beforeClose: ''
          }}
          overlayClassName={{
            base: 'myOverlayClass_after-open',
            afterOpen: 'myOverlayClass_after-open',
            beforeClose: 'myOverlayClass_after-open'
          }}
          ariaHideApp={false}
        >
          <div className="modal-dialog modal-lg modal-open" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => changeModalStatus('userModalOpen')}
                >
                  {TAPi18n.__('action.saveAndClose')}
                </button>
              </div>
              <div className="modal-body">

                <div className="container-modal-users">

                  <div className="row">
                    <div className="/img-users col-xs-12">
                      <img src="/img/users.svg" height="40" />
                    </div>
                    <div className="container-fluid col-md-10 col-xs-12">
                      <h4 className="title-users">{TAPi18n.__('user.new')}</h4>
                      <div className="container pl-0 margin-top-30">
                        <ModalUserTab
                          handleInputChange = {this.handleInputChange.bind(this)}
                          userRoles={getRolesByUser()}
                          errors={this.state.userDataErrors}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        id="createUser"
                        onClick={() => this.openConfirmModal()}
                      >
                        {TAPi18n.__('project.createUser')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

UserModal.propTypes = {
  userModalOpen: PropTypes.bool,
  changeModalStatus: PropTypes.func,
  saveNewUser: PropTypes.func,
  userModalError: PropTypes.object
};
