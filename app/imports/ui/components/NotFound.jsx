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
    return <div className="bg-login">
      <nav className="navbar navbar-expand-lgt">
        <div className="container">

          <a className="navbar-brand" href='' onClick={this.goHome}>
            <img src="/img/bid-logo-white.png" height="30"/>
          </a>

        </div>
      </nav>

      <div className="container content-body">
        <div className="row">
          <div className="col-md-6 offset-md-3 content-register">
            <img src="/img/bid-logo-grande.png" className="centrado" height="85"/>
            <p className="title-form">{TAPi18n.__('notFound.title')}</p>
            <p className="title-form">{TAPi18n.__('notFound.description')}</p>
            <p className="title-form">{TAPi18n.__('notFound.footer')}</p>
            <div className="row">
              <button style={{cursor: 'pointer'}} className="col-md-4 btn btn-primary" onClick={this.goBack}> {TAPi18n.__('notFound.back')} </button>
              <div className="col-md-4"></div>
              <button style={{cursor: 'pointer'}} className="col-md-4 btn btn-success btn-modal" onClick={this.goHome}> {TAPi18n.__('notFound.mainMenu')} </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}


export default NotFound;
