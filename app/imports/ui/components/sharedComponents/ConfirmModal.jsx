import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { TAPi18n } from 'meteor/tap:i18n';

export default class ConfirmModal extends Component {

  constructor(props) {
    super(props);
  }

  getModalDescription() {
    if (this.props.modalDescriptionItems) {
      return (
        <div>
          {this.props.modalDescriptionItems.map((item, index) => {
            return (
              <p key={index}>
                <strong>{item.title}</strong><br/>
                {item.description}
              </p>
            );
          }
          )}
        </div>
      );
    } else {
      return <p> {this.props.modalDescription} </p>;
    }
  }

  getCancelButton() {
    return this.props.showCancelButton ? <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.onCancel}>{TAPi18n.__('cancel')}</button> : '';
  }

  renderLabel() {
    if (this.props.isReconfirm) {
      return this.props.modalLabel + ' ' + TAPi18n.__('pendingUserReconfirmationModal.label');
    }
    return this.props.modalLabel + ' ' + TAPi18n.__('pendingUserModal.label');
  }

  renderTitle() {
    if (this.props.isReconfirm) {
      return TAPi18n.__('pendingUserModal.titleStart') + ' ' + this.props.prefix
        + ' ' + this.props.modalLabel + ' ' + TAPi18n.__('pendingUserModal.titleEnd');
    }
    if (this.props.customTitle !== undefined) {
      return this.props.customTitle;
    }
    return TAPi18n.__('pendingUserReconfirmationModal.titleStart') + ' ' + this.props.prefix
      + ' ' + this.props.modalLabel + ' ' + TAPi18n.__('pendingUserReconfirmationModal.titleEnd');
  }


  render() {
    const { onAccept, confirmModalOpen, onCancel } = this.props;
    return (
      <Modal
        isOpen={confirmModalOpen}
        contentLabel="Modal"
        className={{
          base: '',
          afterOpen: 'modal fade bottom show',
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
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title" id="exampleModalLabel">{this.renderLabel()}</p>
                <button type="button" className="exit" data-dismiss="modal" aria-label="Close" onClick={onCancel}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4>{this.renderTitle()}</h4>
                {this.getModalDescription()}
              </div>
              <div className="modal-footer">
                {this.getCancelButton()}
                <button type="button" className="btn btn-success btn-modal" onClick={onAccept}>{TAPi18n.__('accept')}</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  modalLabel: PropTypes.string,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  modalDescriptionItems: PropTypes.array,
  modalDescription: PropTypes.string,
  confirmModalOpen: PropTypes.bool.isRequired,
  showCancelButton: PropTypes.bool.isRequired,
  isReconfirm: PropTypes.bool,
  prefix: PropTypes.string,
  customTitle: PropTypes.string
};
