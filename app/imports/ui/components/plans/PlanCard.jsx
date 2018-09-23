import React from 'react';
import PropTypes from 'prop-types';
import CrudActions from '../sharedComponents/CrudActions';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { frequencyTime } from '../../../api/helpers/frequency';
import Reminder from './Reminder';

class PlanCard extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      modalIsOpen: false,
      selectedPlanItemIndex: 0
    }
  }

  getOption(frequencyType, frequencyTypeOptions, fieldName, index) {
    if (frequencyType === 'input') {
      return  (
        <input
          className="frequency"
          name={fieldName}
          value={this.props.planItems[index].data[fieldName]}
          onChange={(event) => this.props.handleOnChange(event, index)}
        />
      );
    } else if (frequencyType === 'select') {
      return (
        <select
          name={fieldName}
          value={this.props.planItems[index].data[fieldName]}
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

  getFrequencyThirdOption(planItem, index) {
    if (planItem.data.frequency !== '' && planItem.data.frequencyType !== '') {
      const time = frequencyTime.find(time => time.value === planItem.data.frequency);
      const frequencyType = time ?
        time.types.find(type => type.value === planItem.data.frequencyType) : time;
      if (frequencyType) {
        return (
          <div className="row">
            <div>
              {this.getOption(frequencyType.type, frequencyType.options, 'frequencyValue', index)}
              <p className='small italic-proyectos text-danger'>
                {
                  planItem.errors.frequencyValue ?
                    validationsHelper.getErrorMessage(planItem.errors.frequencyValue.message)
                  : ''
                }
              </p>
            </div>
            <div>
              {this.getOption(frequencyType.secondType, frequencyType.secondOptions, 'frequencySecondValue', index)}
              <p className='small italic-proyectos text-danger'>
                {
                  planItem.errors.frequencySecondValue ?
                    validationsHelper.getErrorMessage(planItem.errors.frequencySecondValue.message)
                    : ''
                }
              </p>
            </div>
          </div>
        )
      }
      return '';
    }
    return '';
  }

	render() {
    const { businessArea, planItems, isEditable, changeEditOptionPlan,
      deletePlan, handleOnChange, modifyPlanItemsList } = this.props;
    return (
      <div>
        <Reminder
          selectedPlanItemIndex={this.state.selectedPlanItemIndex}
          planItems={planItems}
          handleOnChange={(event) => handleOnChange(event, this.state.selectedPlanItemIndex)}
          modalIsOpen={this.state.modalIsOpen}
          changeModalState={() => this.setState({modalIsOpen: !this.state.modalIsOpen})}
        />
        <div className="row header table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Tarea / Herramienta / Objetivo</th>
                <th scope="col">Quién Usa / Hace / Responsable</th>
                <th scope="col">Quién Controla</th>
                <th scope="col">Frecuencia / Plazo</th>
                <th scope="col">
                  <a className="icon" onClick={() => modifyPlanItemsList(true)}>
                    <img src='/img/add.svg'/>
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {planItems.map((planItem, index) => (
                <tr key={index}>
                  <td>
                    <input
                      placeholder="Ej: Publicación en Facebook"
                      value={planItem.data.tool}
                      name='tool'
                      onChange={(event) => handleOnChange(event, index)}
                    />
                    <p className='small italic-proyectos text-danger'>
                      {validationsHelper.getErrorMessage(planItem.errors.tool.message)}
                    </p>
                  </td>
                  <td>
                    <input
                      placeholder="Ej: Moi"
                      value={planItem.data.responsible}
                      name='responsible'
                      onChange={(event) => handleOnChange(event, index)}
                    />
                    <p className='small italic-proyectos text-danger'>
                      {validationsHelper.getErrorMessage(planItem.errors.responsible.message)}
                    </p>
                  </td>
                  <td>
                    <input
                      placeholder="Ej: Nicole"
                      value={planItem.data.supervisor}
                      name='supervisor'
                      onChange={(event) => handleOnChange(event, index)}
                    />
                    <p className='small italic-proyectos text-danger'>
                      {validationsHelper.getErrorMessage(planItem.errors.supervisor.message)}
                    </p>
                  </td>
                  <td>
                    <a onClick={() => this.setState({
                      modalIsOpen: !this.state.modalIsOpen,
                      selectedPlanItemIndex: index
                    })}>
                      <img src='/img/alarm-clock.svg'/>
                    </a>
                  </td>
                  <td>
                    <a className="icon" onClick={() => modifyPlanItemsList(false, index)}>
                      <img src='/img/rubbish-bin-gray.svg'/>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  }
}

PlanCard.propTypes = {
  businessArea: PropTypes.string,
  planItems: PropTypes.array,
  isEditable: PropTypes.bool,
  changeEditOptionPlan:PropTypes.func,
  deletePlan: PropTypes.func,
  handleOnChange: PropTypes.func,
  modifyPlanItemsList: PropTypes.func
};

export default PlanCard;