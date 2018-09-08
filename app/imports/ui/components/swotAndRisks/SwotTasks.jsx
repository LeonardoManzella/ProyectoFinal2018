import React from 'react';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import PropTypes from 'prop-types';
import { frequencyTime } from '../../../api/helpers/frequency';

class SwotTasks extends React.Component {

  getOption(frequencyType, frequencyTypeOptions, fieldName, index) {
    if (frequencyType === 'input') {
      return  (
        <input
          className="frequency"
          name={fieldName}
          value={this.props.swotTasks[index][fieldName]}
          onChange={(event) => this.props.handleOnChange(event, index)}
        />
      );
    } else if (frequencyType === 'select') {
      return (
        <select
          name={fieldName}
          value={this.props.swotTasks[index][fieldName]}
          onChange={(event) => this.props.handleOnChange(event, index)}
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

  getFrequencyThirdOption(swotTask, index) {
    if (swotTask.frequency !== '' && swotTask.frequencyType !== '') {
      const time = frequencyTime.find(time => time.value === swotTask.frequency);
      const frequencyType = time ?
        time.types.find(type => type.value === swotTask.frequencyType) : time;
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

  renderSwotTasksRow(swotTask, swotTaskIndex) {
    const isEditable = true;
    const {handleOnChange, modifySwotTasks} = this.props;
    return (
      <tr key={swotTaskIndex}>
        <td>
          <select
            name='element'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.element}
          >
            <option>Seleccionar elemento</option>
            {
              Object.values(this.props.swot).map((swotElement) => (
                swotElement.map((element, index) => (
                  <option key={index}>{element}</option>
                ))
              ))
            }
          </select>
        </td>
        <td>
          <input
            placeholder="Ej: Seguir así"
            name='tool'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.tool}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Moi"
            name='responsible'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.responsible}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Nicole"
            name='supervisor'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.supervisor}
          />
        </td>
        <td>
          <div className="row">
            <div>
              <div className="row">
                <p> Repetir </p>
                <select
                  name='frequency'
                  onChange={(event) => handleOnChange(event, swotTaskIndex)}
                  value={swotTask.frequency}
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
                  onChange={(event) => handleOnChange(event, swotTaskIndex)}
                  value={swotTask.frequencyType}
                >
                  <option value="">-</option>
                  {
                    swotTask.frequency && swotTask.frequency !== "" &&
                      frequencyTime.find(time => time.value === swotTask.frequency)?
                      frequencyTime.find(time => time.value === swotTask.frequency)
                        .types.map((type, index) =>
                        <option value={type.value} key={index}>{type.name}</option>)
                      : ''
                  }
                </select>
              </div>
            </div>
          </div>
          {this.getFrequencyThirdOption(swotTask, swotTaskIndex)}
        </td>
        {
          isEditable ?
            <td>
              <a className="icon" onClick={() => modifySwotTasks(false, swotTaskIndex)}>
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
    const {modifySwotTasks} = this.props;
    return (
      <div className="swot-tasks">
        <div className="row header">
          <h4>Tareas Foda</h4>
        </div>
        <div className="row header">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Elemento</th>
                <th scope="col">Tarea / Herramienta / Objetivo</th>
                <th scope="col">Quién Usa / Hace / Responsable</th>
                <th scope="col">Quién Controla</th>
                <th scope="col">Frecuencia / Plazo</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a className="icon" onClick={() => modifySwotTasks(true)}>
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
                this.props.swotTasks.map((swotTask, swotTaskIndex) =>
                  this.renderSwotTasksRow(swotTask, swotTaskIndex))
              }
            </tbody>
          </table>
          { this.props.swotTasks.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
  }
}

SwotTasks.propTypes = {
  swot: PropTypes.object,
  swotTasks: PropTypes.array,
  handleOnChange: PropTypes.func,
  modifySwotTasks: PropTypes.func
};

export default SwotTasks;