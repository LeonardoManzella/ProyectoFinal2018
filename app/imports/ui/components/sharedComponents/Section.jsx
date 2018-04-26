import React from 'react';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';

const Section = ({ renderCard, elements, name }) => (
  <div>
    <p className="fecha">{name}</p>
    {elements.map((element, index) => (
      <div key={index}>{renderCard(element)}</div>
    ))}
    {name === TAPi18n.__('status.pending') ? <hr /> : ''}
  </div>
);

Section.propTypes = {
  elements: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default Section;
