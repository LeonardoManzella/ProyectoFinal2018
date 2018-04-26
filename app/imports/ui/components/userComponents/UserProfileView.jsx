import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SharedMethods from '../../../api/helpers/sharedMethods';

export class UserProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: Meteor.user(),
      file: {
        name: '-'
      }
    };

  }

  componentDidMount() {
    SharedMethods.loadResumeName(this);
  }

  getDownloadButton() {
    if (this.state.file.fileId) {
      return SharedMethods.getDownloadButton(this.state.file.fileId);
    } else {
      return '';
    }
  }

  getResumeDiv() {
    if (!this.props.showResume) {
      return '';
    }

    return (
      <div className="form-datos col-md-4">
        <div>
          <p className="small italic-proyectos">{TAPi18n.__('userProfile.resumeUpload')}</p>
          <p>{this.state.file.name}</p>
        </div>

        {this.getDownloadButton()}

      </div>
    );
  }

  render() {

    return <div>

      <div className="container content-body">
        <div className="row margin-bottom-20">

          <div className="col-md-12 margin-bottom-20">
            <h4 className="title-page">{TAPi18n.__('userProfile.myProfile')}</h4>
          </div>

          <div className="w-100"></div>

          <div className="col-md-12 row">
            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.roles')}</p>
              <p>{SharedMethods.getRolesDescriptions(this.state.user.roles)}</p>
            </div>

            {this.getResumeDiv()}
          </div>

          <div className="col-md-12 row">

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.name')}</p>
              <p>{this.state.user.personalInformation.name}</p>
            </div>

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.phone')}</p>
              <p>{this.state.user.personalInformation.phone}</p>
            </div>

          </div>

          <div className="col-md-12 row">

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.surname')}</p>
              <p>{this.state.user.personalInformation.surname}</p>
            </div>

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.email')}</p>
              <p>{this.state.user.emails[0].address}</p>
            </div>

          </div>

          <div className="col-md-6">
            <button type="button"
              className="btn btn-success"
              onClick={() => this.props.changeEdit()}
            >{TAPi18n.__('userProfile.edit')}</button>
          </div>

        </div>

      </div>
    </div>;
  }
}

UserProfileView.propTypes = {
  changeEdit: PropTypes.func,
  showResume: PropTypes.bool
};

export default UserProfileView;
