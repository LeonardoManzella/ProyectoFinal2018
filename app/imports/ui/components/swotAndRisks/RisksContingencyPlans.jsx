import React from 'react';
import PropTypes from 'prop-types';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import RisksTable from './RisksTable';
import { frequencyTime } from '../../../api/helpers/frequency';

const emptyContingencyPlan = {
  element: '',
  tool: '',
  responsible: '',
  supervisor: '',
  frequency: '',
  frequencyType: '',
  frequencyValue: '',
  frequencySecondValue: ''
};

class RisksContingencyPlans extends React.Component {

  getOption(frequencyType, frequencyTypeOptions, fieldName, index) {
    if (frequencyType === 'input') {
      return  (
        <input
          className="frequency"
          name={fieldName}
          value={this.props.contingencyPlans[index][fieldName]}
          onChange={(event) => this.props.handleOnChange(event, 'contingencyPlans', index)}
        />
      );
    } else if (frequencyType === 'select') {
      return (
        <select
          name={fieldName}
          value={this.props.contingencyPlans[index][fieldName]}
          onChange={(event) => this.props.handleOnChange(event, 'contingencyPlans', index)}
        >
          <option value="">-</option>
          {frequencyTypeOptions.map((frequencyOption, index) => (
            <option key={index} value={frequencyOption.value}>{frequencyOption.name}</option>
          ))}
        </select>
      );
    }
    return '';
  }

  getFrequencyThirdOption(contingencyPlan, index) {
    if (contingencyPlan.frequency !== '' && contingencyPlan.frequencyType !== '') {
      const time = frequencyTime.find(time => time.value === contingencyPlan.frequency);
      const frequencyType = time ?
        time.types.find(type => type.value === contingencyPlan.frequencyType) : time;
      if (frequencyType) {
        return (
          <div className="row">
            <div>
              {this.getOption(frequencyType.type, frequencyType.options, 'frequencyValue', index)}
            </div>
            <div>
              {this.getOption(frequencyType.secondType, frequencyType.secondOptions, 'frequencySecondValue', index)}
            </div>
          </div>
        )
      }
      return '';
    }
    return '';
  }

  renderContingencyPlanRow(contingencyPlan, index) {
    const isEditable = true;
    const {handleOnChange, removeElementFromTable} = this.props;
    return (
      <tr key={index}>
        <td>
          <select
            name='element'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.element}
          >
            <option>Seleccionar</option>
            {this.props.risks.map((risk, index) => (
              <option key={index}>{risk.risk}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            placeholder="Ej: Acción"
            name='tool'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.tool}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Moi"
            name='responsible'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.responsible}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Nicole"
            name='supervisor'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, 'contingencyPlans', index)}
            value={contingencyPlan.supervisor}
          />
        </td>
        <td>
          <div className="row">
            <div>
              <div className="row">
                <p> Repetir </p>
                <select
                  name='frequency'
                  onChange={(event) => handleOnChange(event, 'contingencyPlans', index)}
                  value={contingencyPlan.frequency}
                >
                  <option value="">-</option>
                  {
                    frequencyTime.map((time, index) => (
                      <option key={index} value={time.value}>{time.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div>
              <div className="row">
                <p> Según: </p>
                <select
                  name='frequencyType'
                  onChange={(event) => handleOnChange(event, 'contingencyPlans', index)}
                  value={contingencyPlan.frequencyType}
                >
                  <option value="">-</option>
                  {
                    contingencyPlan.frequency && contingencyPlan.frequency !== "" &&
                      frequencyTime.find(time => time.value === contingencyPlan.frequency)?
                      frequencyTime.find(time => time.value === contingencyPlan.frequency)
                        .types.map((type, index) =>
                        <option value={type.value} key={index}>{type.name}</option>)
                      : ''
                  }
                </select>
              </div>
            </div>
          </div>
          {this.getFrequencyThirdOption(contingencyPlan, index)}
        </td>
        {
          isEditable ?
            <td>
              <a
                className="icon"
                onClick={() => removeElementFromTable('contingencyPlans', index)}
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

  render() {
    const isEditable = true;
    const {addElementToTable} = this.props;
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
                        onClick={() => addElementToTable('contingencyPlans', emptyContingencyPlan)}
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
                this.props.contingencyPlans.map((contingencyPlan, index) =>
                  this.renderContingencyPlanRow(contingencyPlan, index))
              }
            </tbody>
          </table>
          { this.props.contingencyPlans.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
  }
}

RisksContingencyPlans.propTypes = {
  risks: PropTypes.array,
  contingencyPlans: PropTypes.array,
  handleOnChange: PropTypes.func,
  removeElementFromTable: PropTypes.func,
  addElementToTable: PropTypes.func
};

export default RisksContingencyPlans;