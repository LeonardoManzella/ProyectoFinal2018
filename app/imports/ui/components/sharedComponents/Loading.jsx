import React, { Component } from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import ReactLoading from 'react-loading';

export default class Loading extends Component {
  render() {
    return (
      <div className="dimmed">
        <div className="loading">
          <ReactLoading className="spinner" type="spinningBubbles" color ="#fff" width="50px" height="50px"/>
          <h4>{TAPi18n.__('loading')}</h4>
        </div>
      </div>
    );
  }
}
