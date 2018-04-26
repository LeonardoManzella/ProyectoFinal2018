import React, { Component } from 'react';
import PropTypes from 'prop-types';

const generateOptions = function(optionsArray) {
  return optionsArray.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ));
};

export default class Options extends Component {

  render() {
    return (
      generateOptions(this.props.options)
    );
  }

}

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string)
};
