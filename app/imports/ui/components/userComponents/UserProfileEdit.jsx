import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import { Meteor } from 'meteor/meteor';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import PropTypes from 'prop-types';
import SharedMethods from '../../../api/helpers/sharedMethods';
import { Roles } from 'meteor/alanning:roles';

const filePlaceholder = '-';

export class UserProfileEdit extends React.Component {

  isProvider() {
    return Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['provider']);
  }

  constructor(props) {
    super(props);

    this.state = {
      user: Meteor.user(),
      errors: validationsHelper.initializeUserProfileErrors()
    };

    if (this.isProvider()) {
      this.state.file = {
        type: '',
        name: null
      };
      this.state.newFile = false;
      this.state.fileError = validationsHelper.initializeFileErrors();
      this.state.file.name = filePlaceholder;
    }

  }

  componentDidMount() {
    SharedMethods.loadResumeName(this);
  }

  getResumeDiv() {
    if (!this.props.showResume) {
      return '';
    }

    return (
      <div className="row">

        <div className="col-10">
          <p className="small italic-proyectos">{TAPi18n.__('userProfile.resumeUpload')}</p>
          <p className="small italic-proyectos">{this.state.file.name}</p>
          <p className='small italic-proyectos text-danger'>
            {validationsHelper.getErrorMessage(this.state.fileError.file.message)}
          </p>
        </div>

        <div className="image-upload col-md-2">
          <label htmlFor="resumeUpload">
            <img src="/img/upload.svg" height="23" />
          </label>
          <input id="resumeUpload" name="resumeFile" type="file"
            onChange={this.selectFile.bind(this)} />
        </div>

      </div>
    );
  }

  handleInputChange(event) {
    const { user, errors } = this.state;
    errors[event.target.id].message = '';

    if (event.target.id === 'email') {
      user.emails[0].address = event.target.value;
    } else {
      user.personalInformation[event.target.id] = event.target.value;
    }

    this.setState({ user, errors });
  }

  hasErrors() {
    let data = this.state.user.personalInformation;
    data.email = this.state.user.emails[0].address;

    const errors = validationsHelper.getProjectErrors(data,
      this.state.errors);

    let fileError = {
      hasErrors: false
    };

    if (this.isProvider()) {
      if (this.state.file.name === filePlaceholder) {
        delete(this.state.file.name);
      }
      fileError = validationsHelper.getProjectErrors({file: this.state.file},
        this.state.fileError);
    }

    const hasErrors = errors.hasErrors || fileError.hasErrors;

    if (hasErrors) {
      this.setState(
        {
          errors: errors.newErrors,
          fileError: fileError.newErrors
        }
      );
    }

    return hasErrors;
  }

  submitChanges() {
    if (this.hasErrors()) {
      return;
    }

    const fileToSave = this.state.file;
    const user = this.state.user;

    const changeEditFunction =  this.props.changeEdit;

    if (!this.state.newFile) {
      Meteor.call('updateUserProfile',
        user,
        fileToSave,
        null,
        (error) => {
          if (error) {
            validationsHelper.displayServerError(error);
          } else {
            this.props.changeEdit();
          }
        });
    } else {
      SharedMethods.uploadFile(fileToSave.selectedFile).then(function(fileId) {
        Meteor.call('updateUserProfile',
          user,
          fileToSave,
          fileId,
          (error) => {
            if (error) {
              validationsHelper.displayServerError(error);
            } else {
              changeEditFunction();
            }
          });
      }).catch(function(error) {
        validationsHelper.displayFileError(error);
        this.setState({
          fileError: error
        });
      });
    }

  }

  selectFile(event) {
    const selectedFile = event.target.files[0];

    const { fileError } = this.state;
    fileError.file.message = '';

    this.setState(
      {
        file: {
          selectedFile: selectedFile,
          type: 'resume',
          name: selectedFile.name
        },
        newFile: true,
        fileError
      }
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
              <input className="form-control form-control-sm form-users" type="text"
                value={SharedMethods.getRolesDescriptions(this.state.user.roles)} disabled/>
            </div>
            <div className="form-datos col-md-4">
              {this.getResumeDiv()}
            </div>
          </div>

          <div className="col-md-12 row">

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.name')}</p>
              <input id="name" value={this.state.user.personalInformation.name}
                onChange={this.handleInputChange.bind(this)}
                className="form-control form-control-sm form-users" type="text"/>
              <p className='small italic-proyectos text-danger'>
                {validationsHelper.getErrorMessage(this.state.errors.name.message)}
              </p>
            </div>

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.phone')}</p>
              <input id="phone" value={this.state.user.personalInformation.phone}
                onChange={this.handleInputChange.bind(this)}
                className="form-control form-control-sm form-users" type="text"/>
              <p className='small italic-proyectos text-danger'>
                {validationsHelper.getErrorMessage(this.state.errors.phone.message)}
              </p>
            </div>

          </div>

          <div className="col-md-12 row">

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.surname')}</p>
              <input id="surname" value={this.state.user.personalInformation.surname}
                onChange={this.handleInputChange.bind(this)}
                className="form-control form-control-sm form-users" type="text"/>
              <p className='small italic-proyectos text-danger'>
                {validationsHelper.getErrorMessage(this.state.errors.surname.message)}
              </p>
            </div>

            <div className="form-datos col-md-4">
              <p className="small italic-proyectos">{TAPi18n.__('userProfile.email')}</p>
              <input id="email" value={this.state.user.emails[0].address}
                onChange={this.handleInputChange.bind(this)}
                className="form-control form-control-sm form-users" type="text"/>
              <p className='small italic-proyectos text-danger'>
                {validationsHelper.getErrorMessage(this.state.errors.email.message)}
              </p>
            </div>

          </div>

          <div className="col-md-6">
            <button type="button"
              className="btn btn-success"
              onClick={() => this.submitChanges()}
            >{TAPi18n.__('userProfile.save')}</button>
          </div>

        </div>

      </div>
    </div>;
  }
}

UserProfileEdit.propTypes = {
  changeEdit: PropTypes.func,
  showResume: PropTypes.bool
};

export default UserProfileEdit;
