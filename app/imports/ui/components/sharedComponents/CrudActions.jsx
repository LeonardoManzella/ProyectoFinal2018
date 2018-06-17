import React from 'react';
import PropTypes from 'prop-types';

class CrudActions extends React.Component {

  render() {
    const { isEditable, iconsColor, editAction, deleteAction, confirmAction, denyAction } = this.props;
    if (!isEditable) {
      return (
        <div className="actions">
          <a className="icon" onClick={editAction}>
            <img src={'/img/edit' + iconsColor + '.svg'}/>
          </a>
          <a className="icon" onClick={deleteAction}>
            <img src={'/img/rubbish-bin' + iconsColor + '.svg'}/>
          </a>
        </div>
      );
    }
    return (
      <div className="actions">
        <a className="icon" onClick={confirmAction}>
          <img src={'/img/checked-symbol' + iconsColor + '.svg'}/>
        </a>
        <a className="icon" onClick={denyAction}>
          <img src={'/img/close-cross' + iconsColor + '.svg'} className="cross"/>
        </a>
      </div>
    )
  }
}

CrudActions.propTypes = {
  isEditable: PropTypes.bool,
  iconsColor: PropTypes.string,
  editAction: PropTypes.func,
  deleteAction: PropTypes.func,
  confirmAction: PropTypes.func,
  denyAction: PropTypes.func
};

export default CrudActions;