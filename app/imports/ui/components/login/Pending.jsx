import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
class Pending extends React.Component {

  constructor(props) {
    super(props);
  }

  logout() {
    Meteor.logout((err) => {
      if (!err) {
        FlowRouter.go('landing');
      }
    });
  }

  render() {
    return <div className="bg-login">
      <nav className="navbar navbar-expand-lgt">
        <div className="container">

          <a className="navbar-brand" href='' onClick={this.goHome}>
            <img src="img/bid-logo-white.png" height="30"/>
          </a>

        </div>
      </nav>

      <div className="container content-body">
        <div className="row">
          <div className="col-md-6 offset-md-3 content-register">
            <img src="img/bid-logo-grande.png" className="centrado" height="85"/>
            <p className="title-form">{TAPi18n.__('notFound.title')}</p>
            <p className="title-form">{TAPi18n.__('pending.description')}</p>
            <div className="row">
              <button style={{cursor: 'pointer'}} className="col-md-4 btn btn-primary centrado" onClick={this.logout}> {TAPi18n.__('pending.logout')} </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}


export default Pending;
