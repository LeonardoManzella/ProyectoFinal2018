import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validationsHelper } from '../../../api/helpers/validationsHelper';

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { renderTitle } = this.props;
    return (
      <div className="row">
        {renderTitle()}
      </div>
    );
  }
}

Header.propTypes = {
  renderTitle: PropTypes.func
};


