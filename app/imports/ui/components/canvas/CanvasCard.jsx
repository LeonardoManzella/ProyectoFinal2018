import React from 'react';
import PropTypes from 'prop-types';

class CanvasCard extends React.Component {

  renderActionsMenu(isEditable) {
    if (!isEditable) {
      return (
        <div className="actions">
          <a className="icon" onClick={this.props.changeEditOptionBusinessArea}>
            <img src='/img/edit.svg'/>
          </a>
          <a className="icon" onClick={this.props.deleteBusinessArea}>
            <img src='/img/rubbish-bin.svg'/>
          </a>
        </div>
      );
    }
    return (
      <div className="actions">
        <a className="icon" onClick={this.props.changeEditOptionBusinessArea}>
          <img src='/img/checked-symbol.svg'/>
        </a>
        <a className="icon" onClick={this.props.changeEditOptionBusinessArea}>
          <img src='/img/close-cross.svg' className="cross"/>
        </a>
      </div>
    )
  }

	render() {
    const { businessAreaData, isEditable, handleOnChange, modifyCompetitorsList } = this.props;
    return (
      <div className="canvas-card col-md-12">
        <div className="row">
          <h2 className="title">
            <input
              placeholder="ÁREA DE NEGOCIO"
              value={businessAreaData.name}
              name='name'
              onChange={handleOnChange}
              disabled={!isEditable}
            />
          </h2>
          {this.renderActionsMenu(isEditable)}
        </div>
        <div className="row">
          <div className="col-md-3">
            <textarea
              placeholder="Detalles"
              value={businessAreaData.details}
              name='details'
              onChange={handleOnChange}
              disabled={!isEditable}
            />
          </div>
          <div className="col-md-3">
            <textarea
              placeholder="Proveedores"
              value={businessAreaData.providers}
              name='providers'
              onChange={handleOnChange}
              disabled={!isEditable}
            />
          </div>
          <div className="col-md-6">
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Competidor</th>
                    <th scope="col">Diferenciador</th>
                    {
                      isEditable ?
                        <th scope="col">
                          <a className="icon" onClick={() => modifyCompetitorsList(true)}>
                            <img src='/img/add.svg'/>
                          </a>
                        </th>
                        :
                        <th />
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    businessAreaData.competitors.map((competitor, index) =>
                      <tr key={index}>
                        <td>
                          <input
                            placeholder="competidor"
                            value={competitor.name}
                            name='name'
                            onChange={(event) => handleOnChange(event, index)}
                            disabled={!isEditable}
                          />
                        </td>
                        <td>
                          <input
                            placeholder="diferenciador"
                            value={competitor.differentiator}
                            name='differentiator'
                            onChange={(event) => handleOnChange(event, index)}
                            disabled={!isEditable}
                          />
                        </td>
                        {
                          isEditable ?
                            <td>
                              <a className="icon" onClick={() => modifyCompetitorsList(false, index)}>
                                <img src='/img/rubbish-bin-gray.svg'/>
                              </a>
                            </td>
                            :
                            <td />
                        }
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <textarea
              placeholder="Clientes"
              value={businessAreaData.clients}
              name='clients'
              onChange={handleOnChange}
              disabled={!isEditable}
            />
          </div>
          <div className="col-md-6">
            <textarea
              placeholder="Clientes Aglutinadores"
              value={businessAreaData.agglutinativeClients}
              name='agglutinativeClients'
              onChange={handleOnChange}
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>
    );

  }
}

CanvasCard.propTypes = {
  businessAreaData: PropTypes.object,
  isEditable: PropTypes.bool,
  changeEditOptionBusinessArea: PropTypes.func,
  deleteBusinessArea: PropTypes.func,
  handleOnChange: PropTypes.func,
  addCompetitor: PropTypes.func,
  modifyCompetitorsList: PropTypes.func
};

export default CanvasCard;