import React, { Component } from 'react';

export default class EmptyMessage extends Component {

  render() {
    return (
      <div className="row empty-message">
        <div className="col-md-12">
          <h3>No hay elementos en la lista</h3>
        </div>
      </div>
    );
  }
}

EmptyMessage.propTypes = {
};


