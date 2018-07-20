import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TAPi18n } from 'meteor/tap:i18n';

class NotFound extends React.Component {

  constructor(props) {
    super(props);
  }

  goHome() {
    FlowRouter.go('home');
  }

  goBack() {
    history.back();
  }

  render() {
    return (
      <div className="login login-container not-found">
        <div className="row">
          <div className="col-md-6 offset-md-3 content-register">
            <img src="/img/emprendimientos-logo.png" className="centrado" height="85"/>
            <p className="message">La página solicitada no existe o no tiene permisos para acceder</p>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-3">
                <button style={{cursor: 'pointer'}} className="col-md-3 transparent-button centrado" onClick={this.goBack}> {TAPi18n.__('notFound.back')} </button>
              </div>
              <div className="col-md-3">
                <button style={{cursor: 'pointer'}} className="col-md-3 transparent-button centrado" onClick={this.goHome}> {TAPi18n.__('notFound.mainMenu')} </button>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}


export default NotFound;
