import React from 'react';
import PropTypes from 'prop-types';
import CrudActions from '../sharedComponents/CrudActions';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import { validationsHelper } from '../../../api/helpers/validationsHelper';

class PlanCard extends React.Component {

  getBusinessAreaName(businessAreaId) {
    if (businessAreaId === 'all') {
      return 'Todas';
    }
    const businessArea = BusinessAreas.findOne({_id: businessAreaId});
    return businessArea ? businessArea.name : '';
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
                    {/* <input
                      placeholder="Ej: Cada 2 días"
                      value={planItem.frequency}
                      name='frequency'
                      onChange={(event) => handleOnChange(event, index)}
                      disabled={!isEditable}
                    /> */}
                    <div className="row">
                      <p> Repetir </p>
                      <select
                        placeholder="Ej: Cada 2 días"
                        name='frequency'
                        onChange={(event) => handleOnChange(event, index)}
                        disabled={!isEditable}
                      >
                        <option value="daily">diariamente</option>
                        <option value="weekly">semanalmente</option>
                        <option value="monthly">mensualmente</option>
                        <option value="year">anualmente</option>
                      </select>
                    </div>
                    <div className="row">
                      <p> Cada: </p>
                      <select
                        placeholder="Ej: Cada 2 días"
                        name='frequency'
                        // onChange={(event) => handleOnChange(event, index)}
                        disabled={!isEditable}
                      >
                        <option>-</option>
                        {
                          planItem.data.frequency === "weekly" ?
                            ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
                            'Domingo', 1, 2, 3, 4, 5, 6].map((opt, index) =>
                              <option key={index}>{opt}</option>) :
                            [1, 2, 3, 4, 5, 6].map((opt, index) =>
                              <option key={index}>{opt}</option>)
                        }
                      </select>
                    </div>
                    <p className='small italic-proyectos text-danger'>
                      {validationsHelper.getErrorMessage(planItem.errors.frequency.message)}
                    </p>
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