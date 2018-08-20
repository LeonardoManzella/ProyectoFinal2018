import React from 'react';
import PropTypes from 'prop-types';
import CrudActions from '../sharedComponents/CrudActions';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { frequencyTime } from '../../../api/helpers/frequency';

class PlanCard extends React.Component {

  getBusinessAreaName(businessAreaId) {
    if (businessAreaId === 'all') {
      return 'Todas';
    }
    const businessArea = BusinessAreas.findOne({_id: businessAreaId});
    return businessArea ? businessArea.name : '';
  }

  getOption(frequencyType, frequencyTypeOptions, fieldName, index) {
    if (frequencyType === 'input') {
      return  (
        <input
          className="frequency"
          name={fieldName}
          value={this.props.planItems[index].data[fieldName]}
          onChange={(event) => this.props.handleOnChange(event, index)}
          disabled={!this.props.isEditable}
        />
      );
    } else if (frequencyType === 'select') {
      return (
        <select
          name={fieldName}
          value={this.props.planItems[index].data[fieldName]}
          onChange={(event) => this.props.handleOnChange(event, index)}
          disabled={!this.props.isEditable}
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
          <div>
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
        <div className="row header">
          <div className="col-md-4">
            <h5>{this.getBusinessAreaName(businessArea)}</h5>
          </div>
          <div className="col-md-8">
            <CrudActions
              isEditable={isEditable}
              iconsColor='-gray'
              editAction={changeEditOptionPlan}
              deleteAction={deletePlan}
              confirmAction={changeEditOptionPlan}
              denyAction={changeEditOptionPlan}
            />
          </div>
        </div>
        <div className="row header table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Tarea / Herramienta / Objetivo</th>
                <th scope="col">Quién Usa / Hace / Responsable</th>
                <th scope="col">Quién Controla</th>
                <th scope="col">Frecuencia / Plazo</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a className="icon" onClick={() => modifyPlanItemsList(true)}>
                        <img src='/img/add.svg'/>
                      </a>
                    </th>
                    :
                    <th />
                }
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
                      disabled={!isEditable}
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
                      disabled={!isEditable}
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
                      disabled={!isEditable}
                    />
                    <p className='small italic-proyectos text-danger'>
                      {validationsHelper.getErrorMessage(planItem.errors.supervisor.message)}
                    </p>
                  </td>
                  <td>
                    <div className="row">
                      <div>
                        <div className="row">
                          <p> Repetir </p>
                          <select
                            placeholder="Ej: Cada 2 días"
                            name='frequency'
                            onChange={(event) => handleOnChange(event, index)}
                            disabled={!isEditable}
                            value={planItem.data.frequency}
                          >
                            <option value="">-</option>
                            {
                              frequencyTime.map((time, index) => (
                                <option key={index} value={time.value}>{time.name}</option>
                              ))
                            }
                          </select>
                        </div>
                        <p className='small italic-proyectos text-danger'>
                          {validationsHelper.getErrorMessage(planItem.errors.frequency.message)}
                        </p>
                      </div>
                      <div>
                        <div className="row">
                          <p> Según: </p>
                          <select
                            placeholder="Ej: Cada 2 días"
                            name='frequencyType'
                            onChange={(event) => handleOnChange(event, index)}
                            disabled={!isEditable}
                            value={planItem.data.frequencyType}
                          >
                            <option value="">-</option>
                            {
                              planItem.data.frequency && planItem.data.frequency !== "" &&
                                frequencyTime.find(time => time.value === planItem.data.frequency)?
                                frequencyTime.find(time => time.value === planItem.data.frequency)
                                  .types.map((type, index) =>
                                  <option value={type.value} key={index}>{type.name}</option>)
                                : ''
                            }
                          </select>
                        </div>
                        <p className='small italic-proyectos text-danger'>
                          {validationsHelper.getErrorMessage(planItem.errors.frequencyType.message)}
                        </p>
                      </div>
                    </div>
                    {this.getFrequencyThirdOption(planItem, index)}
                  </td>
                  {
                    isEditable ?
                      <td>
                        <a className="icon" onClick={() => modifyPlanItemsList(false, index)}>
                          <img src='/img/rubbish-bin-gray.svg'/>
                        </a>
                      </td>
                      :
                      <td />
                  }
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