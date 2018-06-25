import React from 'react';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';
import EmptyMessage from '../sharedComponents/EmptyMessage';

class PlanList extends React.Component {

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
      savePlans
    } = this.props;
    const isEditable = true;
    return (
      <div>
        <div className="row header">
          <div className="col-md-6">
            <h2>{'PLANES ' + title }</h2>
          </div>
          <div className="col-md-6">
            <button onClick={savePlans}>
              Guardar Cambios
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
              <option value='Galeria de Arte'>Galería de Arte</option>
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
  savePlans: PropTypes.func
};

export default PlanList;