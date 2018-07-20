import React from 'react';
import PropTypes from 'prop-types';
import EmptyMessage from '../sharedComponents/EmptyMessage';

const emptyRisk = {
  risk: '',
  probability: '',
  impact: '',
  detectionCapacity: ''
};

class RisksTable extends React.Component {

  renderRiskRow(risk, index) {
    const isEditable = true;
    const {handleOnChange, removeElementFromTable} = this.props;
    return (
      <tr key={index}>
        <td>
          <input
            placeholder="Riesgo"
            name='risk'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'risks', index)}
            value={risk.risk}
          />
        </td>
        <td>
          <select
            name='probability'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'risks', index)}
            value={risk.probability}
          >
            <option>Seleccionar</option>
            <option>Muy alta</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
            <option>Muy Baja</option>
          </select>
        </td>
        <td>
          <select
            name='impact'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'risks', index)}
            value={risk.impact}
          >
            <option>Seleccionar</option>
            <option>Muy alto</option>
            <option>Alto</option>
            <option>Medio</option>
            <option>Bajo</option>
            <option>Muy Bajo</option>
          </select>
        </td>
        <td>
          <select
            name='detectionCapacity'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'risks', index)}
            value={risk.detectionCapacity}
          >
            <option>Seleccionar</option>
            <option>Muy alta</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
            <option>Muy Baja</option>
          </select>
        </td>
        {
          isEditable ?
            <td>
              <a className="icon" onClick={() => removeElementFromTable('risks', index)}>
                <img src='/img/rubbish-bin-gray.svg'/>
              </a>
            </td>
            :
            <td />
        }
      </tr>
    );
  }

  render() {
    const isEditable = true;
    const {addElementToTable} = this.props;
    return (
      <div className="swot-tasks">
        <div className="row header">
          <h4>Riesgos</h4>
        </div>
        <div className="row header">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Riesgo</th>
                <th scope="col">Probabilidad de ocurrencia</th>
                <th scope="col">Nivel de Impacto</th>
                <th scope="col">Capacidad de Detección</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a className="icon" onClick={() => addElementToTable('risks', emptyRisk)}>
                        <img src='/img/add.svg'/>
                      </a>
                    </th>
                    :
                    <th />
                }
              </tr>
            </thead>
            <tbody>
              {this.props.risks.map((risk, index) => this.renderRiskRow(risk, index))}
            </tbody>
          </table>
          { this.props.risks.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
  }
}

RisksTable.propTypes = {
  risks: PropTypes.array,
  handleOnChange: PropTypes.func,
  removeElementFromTable: PropTypes.func,
  addElementToTable: PropTypes.func
};

export default RisksTable;