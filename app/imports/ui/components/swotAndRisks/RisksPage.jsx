import React from 'react';
import PropTypes from 'prop-types';
import EmptyMessage from '../sharedComponents/EmptyMessage';

const emptyRisk = {
  risk: '',
  probability: '',
  impact: '',
  detectionCapacity: ''
};

const emptyContingencyPlan = {
  element: '',
  tool: '',
  responsible: '',
  supervisor: '',
  frequency: ''
};

class RisksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      risks: props.risks ? props.risks : [],
      contingencyPlans: props.contingencyPlans ? props.contingencyPlans : []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.risks) {
      this.setState({risks: nextProps.risks});
    }
    if (nextProps.contingencyPlans) {
      this.setState({contingencyPlans: nextProps.contingencyPlans});
    }
  }

  handleOnChange(event, table, index) {
    const tableElements = this.state[table];
    tableElements[index][event.target.name] = event.target.value;
    this.setState({[table]: tableElements});
  }

  addElementToTable(table, emptyElement) {
    const tableElements = this.state[table];
    tableElements.push(Object.assign({}, emptyElement));
    this.setState({[table]: tableElements});
  }

  removeElementFromTable(table, index) {
    const tableElements = this.state[table];
    tableElements.splice(index, 1);
    this.setState({[table]: tableElements});
  }

  renderRiskRow(risk, index) {
    const isEditable = true;
    return (
      <tr key={index}>
        <td>
          <input
            placeholder="Riesgo"
            name='risk'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'risks', index)}
            value={risk.risk}
          />
        </td>
        <td>
          <select
            name='probability'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'risks', index)}
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
            onChange={(event) => this.handleOnChange(event, 'risks', index)}
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
            onChange={(event) => this.handleOnChange(event, 'risks', index)}
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
              <a className="icon" onClick={() => this.removeElementFromTable('risks', index)}>
                <img src='/img/rubbish-bin-gray.svg'/>
              </a>
            </td>
            :
            <td />
        }
      </tr>
    );
  }

  renderRisks() {
    const isEditable = true;
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
                      <a className="icon" onClick={() => this.addElementToTable('risks', emptyRisk)}>
                        <img src='/img/add.svg'/>
                      </a>
                    </th>
                    :
                    <th />
                }
              </tr>
            </thead>
            <tbody>
              {this.state.risks.map((risk, index) => this.renderRiskRow(risk, index))}
            </tbody>
          </table>
          { this.state.risks.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
  }

  renderContingencyPlanRow(contingencyPlan, index) {
    const isEditable = true;
    return (
      <tr key={index}>
        <td>
          <select
            name='element'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.element}
          >
            <option>Seleccionar</option>
            {this.state.risks.map((risk, index) => (
              <option key={index}>{risk.risk}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            placeholder="Ej: Acción"
            name='tool'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.tool}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Moi"
            name='responsible'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.responsible}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Nicole"
            name='supervisor'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.supervisor}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Cada 2 días"
            name='frequency'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.frequency}
          />
        </td>
        {
          isEditable ?
            <td>
              <a
                className="icon"
                onClick={() => this.removeElementFromTable('contingencyPlans', index)}
              >
                <img src='/img/rubbish-bin-gray.svg'/>
              </a>
            </td>
            :
            <td />
        }
      </tr>
    );
  }

  renderContingencyPlans() {
    const isEditable = true;
    return (
      <div className="swot-tasks">
        <div className="row header">
          <h4>Plan de Contingencia</h4>
        </div>
        <div className="row header">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Riesgo</th>
                <th scope="col">Tarea / Herramienta / Objetivo</th>
                <th scope="col">Quién Usa / Hace / Responsable</th>
                <th scope="col">Quién Controla</th>
                <th scope="col">Frecuencia / Plazo</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a
                        className="icon"
                        onClick={() => this.addElementToTable('contingencyPlans', emptyContingencyPlan)}
                      >
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
                this.state.contingencyPlans.map((contingencyPlan, index) =>
                  this.renderContingencyPlanRow(contingencyPlan, index))
              }
            </tbody>
          </table>
          { this.state.contingencyPlans.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
  }

  saveRisks() {
    Meteor.call('insertRisks', this.state.risks, this.state.contingencyPlans);
  }

	render() {
    if (this.props.loading) {
      return <div />
    }
		return (
			<div className="content-body">
        <div className="row header">
            <div className="col-md-6">
              <h2>RIESGOS</h2>
            </div>
            <div className="col-md-6">
              <button onClick={this.saveRisks.bind(this)}>
                Guardar Cambios
              </button>
            </div>
        </div>
        {this.renderRisks()}
        {this.renderContingencyPlans()}
			</div>
		);
	}
}

RisksPage.propTypes = {
  loading: PropTypes.bool,
  risks: PropTypes.array,
  contingencyPlans: PropTypes.array
};

export default RisksPage;