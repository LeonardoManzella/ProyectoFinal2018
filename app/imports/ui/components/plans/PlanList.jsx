import React from 'react';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';
import EmptyMessage from '../sharedComponents/EmptyMessage';

class PlanList extends React.Component {

  checkEntrepreneurStatus() {
    return (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
      Meteor.user() && Meteor.user().personalInformation.status === 'pendingPlans');
  }

	render() {
    const {
      title,
      addPlan,
      changeEditOptionPlan,
      deletePlan,
      handleOnChange,
      modifyPlanItemsList,
      planTypeList,
      handleSelectChange,
      savePlans,
      businessAreas
    } = this.props;
    const isEditable = true;
    return (
      <div>
        <div className="row header">
          <div className="col-md-6">
            <h2>{'Planes ' + title }</h2>
          </div>
          <div className="col-md-6">
            <button onClick={savePlans}>
              {this.checkEntrepreneurStatus() ? 'Guardar Cambios y Avanzar' : 'Guardar Cambios'}
            </button>
            <button onClick={addPlan}>
              Agregar Plan
            </button>
            <select
              onChange={handleSelectChange}
              value={this.selectedBusinessArea}
              defaultValue=''
            >
              <option value='' disabled hidden>Elegir Área</option>
              <option value='all'>Todas</option>
              {
                businessAreas.map((area, index) =>
                  <option key={index} value={area._id}>{area.name}</option>
                )
              }
            </select>
          </div>
        </div>
        {
          planTypeList.map((planType, index) =>
            <PlanCard
              key={index}
              businessArea={planType.data.planArea}
              planItems={planType.data.planItems}
              isEditable={planType.editable}
              changeEditOptionPlan={() => changeEditOptionPlan(index)}
              deletePlan={() => deletePlan(index)}
              handleOnChange={(event, indexPlanItem) =>
                handleOnChange(event, index, indexPlanItem)}
              modifyPlanItemsList={(addPlanItem, indexPlanItem) =>
                modifyPlanItemsList(index, addPlanItem, indexPlanItem)}
            />
          )
        }
        { planTypeList.length === 0 ? <EmptyMessage /> : '' }
      </div>
    );

  }
}

PlanList.propTypes = {
  title: PropTypes.string,
  planTypeList: PropTypes.array,
  addPlan: PropTypes.func,
  changeEditOptionPlan: PropTypes.func,
  deletePlan: PropTypes.func,
  handleOnChange: PropTypes.func,
  modifyPlanItemsList: PropTypes.func,
  handleSelectChange: PropTypes.func,
  savePlans: PropTypes.func,
  businessAreas: PropTypes.array
};

export default PlanList;