import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import Loading from './Loading';

const List = ({ loading, sections, renderCard, sectionNames, emptyMessage }) => {
  if (loading) {
    return <Loading />;
  }
  if (emptyMessage !== '') {
    return <div className="col-md-12">
    <img src="/img/icon-results.svg" className="img-results mx-auto" />
    <p className="text-results"> {emptyMessage} </p>
    </div>;
  }

  return (
    sections.map((section, index) => (
      <Section
        key={index}
        elements={section}
        renderCard={renderCard}
        name={sectionNames[index]}
      />
    ))
  );
};

List.propTypes = {
  loading: PropTypes.bool.isRequired,
  sections: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  sectionNames: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string.isRequired
};

export default List;
