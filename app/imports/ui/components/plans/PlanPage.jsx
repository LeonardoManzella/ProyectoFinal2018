import React from 'react';
import StepZilla from 'react-stepzilla';
import PlanList from './PlanList';
import PropTypes from 'prop-types';

const emptyPlanItem = {
  tool: '',
  responsible: '',
  supervisor: '',
  frequency: ''
};

const emptyPlan = {
  planArea: '',
  planItems: []
};

const planTypes = [
  {
    name: "PLAN DE ADMINISTRACIÓN",
    title: "de Administración",
    component: <PlanList/>
  },
  {
    name: "PLAN LEGAL",
    title: "Legales",
    component: <PlanList/>
  },
  {
    name: "PLAN CONTABLE",
    title: "Contables",
    component: <PlanList/>
  },
  {
    name: "PLAN DE PRODUCCIÓN",
    title: "de Producción",
    component: <PlanList/>
  },
  {
    name: "PLAN COMERCIAL",
    title: "Comerciales",
    component: <PlanList/>
  },
  {
    name: "PLAN DE COMUNICACIÓN",
    title: "de Comunicación",
    component: <PlanList/>
  },
  {
    name: "PLAN ECONÓMICO / FINANCIERO",
    title: "Económicos / Financieros",
    component: <PlanList/>
  },
  {
    name: "PLAN DE SISTEMAS",
    title: "de Sistemas",
    component: <PlanList/>
  }
];

class PlanPage extends React.Component {

  constructor(props) {
    super(props);
    const plans = planTypes.map(planType => ({
      name: planType.name,
      planTypeList: props.planTypeList ?
        props.planTypeList
          .filter(plan => plan.name === planType.name)
          .map(plan => ({data: plan.data, editable: plan.editable}))
        : []
    }));
    this.state = {
      plans,
      selectedBusinessArea: '',
      currentStep: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const plans = planTypes.map(planType => ({
      name: planType.name,
      planTypeList: nextProps.planTypeList ?
        nextProps.planTypeList
          .filter(plan => plan.name === planType.name)
          .map(plan => ({data: plan.data, editable: plan.editable}))
        : []
    }));
    this.setState({plans});
  }

  addPlan() {
    const { plans } = this.state;
    const data = Object.assign({}, emptyPlan);
    data.planArea = this.state.selectedBusinessArea;
    data.planItems = [];
    data.planItems.push(Object.assign({}, emptyPlanItem));
    const newPlan = {
      data,
      editable: true
    };
    plans[this.state.currentStep].planTypeList.push(newPlan);
    this.setState({plans});
  }

  changeEditOptionPlan(index) {
    const { plans } = this.state;
    plans[this.state.currentStep].planTypeList[index].editable =
      !this.state.plans[this.state.currentStep].planTypeList[index].editable;
    this.setState({plans});
  }

  deletePlan(index) {
    const { plans } = this.state;
    plans[this.state.currentStep].planTypeList.splice(index, 1);
    this.setState({plans});
  }

  handleOnChange(event, index, indexPlanItem) {
    const { plans } = this.state;
    plans[this.state.currentStep].planTypeList[index].data
      .planItems[indexPlanItem][event.target.name] = event.target.value;
    this.setState({plans});
  }

  modifyPlanItemsList(index, addPlanItem, indexPlanItem) {
    const { plans } = this.state;
    if (addPlanItem) {
      plans[this.state.currentStep].planTypeList[index].data
        .planItems.push(Object.assign({}, emptyPlanItem));
    } else {
      plans[this.state.currentStep].planTypeList[index].data
        .planItems.splice(indexPlanItem, 1);
    }
    this.setState({plans});
  }

  savePlans() {
    Meteor.call('insertNewPlanList', this.state.plans);
  }

	render() {
    let steps = Object.assign([], planTypes);
    steps = steps.map((step, index) => {
      const newStep = Object.assign({}, step);
      newStep.component = (
        <PlanList
          title={step.title}
          planTypeList={this.state.plans[index].planTypeList}
          addPlan={this.addPlan.bind(this)}
          changeEditOptionPlan={this.changeEditOptionPlan.bind(this)}
          deletePlan={this.deletePlan.bind(this)}
          handleOnChange={this.handleOnChange.bind(this)}
          modifyPlanItemsList={this.modifyPlanItemsList.bind(this)}
          handleSelectChange={(e) => this.setState({'selectedBusinessArea': e.target.value})}
          savePlans={this.savePlans.bind(this)}
        />
      );
      return newStep;
    });
		return (
			<div className="content-body plan">
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            nextButtonText='Siguiente'
            backButtonText='Anterior'
            // prevBtnOnLastStep={false}
            backButtonCls='backButtonClass'
            nextButtonCls='nextButtonClass'
            onStepChange={(step) => this.setState({currentStep: step})}
          />
        </div>
        { // FIXME: Ver de usar solo al principio, cuando se da el Alta, y no para Baja y Modif
          /* {
          this.state.currentStep === steps.length - 1 ?
            <div className="footer-buttons">
              <button className="nextButtonClass" id="next-button" onClick={this.savePlans.bind(this)}>
                Guardar Planes
              </button>
            </div>
            : ''
        } */}
			</div>
		);
			
	}
}

PlanPage.propTypes = {
  loading: PropTypes.bool,
  planTypeList: PropTypes.array
};

PlanPage.defaultProps = {
  planTypeList: []
};

export default PlanPage;