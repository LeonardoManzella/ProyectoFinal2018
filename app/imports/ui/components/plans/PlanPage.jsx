import React from 'react';
import StepZilla from 'react-stepzilla';
import PlanList from './PlanList';

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
    title: "DE ADMINISTRACIÓN",
    component: <PlanList/>
  },
  {
    name: "PLAN LEGAL",
    title: "LEGALES",
    component: <PlanList/>
  },
  {
    name: "PLAN CONTABLE",
    title: "CONTABLES",
    component: <PlanList/>
  },
  {
    name: "PLAN DE PRODUCCIÓN",
    title: "DE PRODUCCIÓN",
    component: <PlanList/>
  },
  {
    name: "PLAN COMERCIAL",
    title: "COMERCIALES",
    component: <PlanList/>
  },
  {
    name: "PLAN DE COMUNICACIÓN",
    title: "DE COMUNICACIÓN",
    component: <PlanList/>
  },
  {
    name: "PLAN ECONÓMICO / FINANCIERO",
    title: "ECONÓMICOS / FINANCIEROS",
    component: <PlanList/>
  },
  {
    name: "PLAN DE SISTEMAS",
    title: "DE SISTEMAS",
    component: <PlanList/>
  }
];

class PlanPage extends React.Component {

  constructor(props) {
    super(props);
    const plans = planTypes.map(planType => ({
      name: planType.name,
      planTypeList: []
    }));
    this.state = {
      plans,
      selectedBusinessArea: '',
      currentStep: 0
    };
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
            prevBtnOnLastStep={false}
            backButtonCls='backButtonClass'
            nextButtonCls='nextButtonClass'
            onStepChange={(step) => this.setState({currentStep: step})}
          />
        </div>
        {
          this.state.currentStep === steps.length - 1 ?
            <div className="footer-buttons">
              <button className="nextButtonClass" id="next-button">
                Guardar Planes
              </button>
            </div>
            : ''
        }
			</div>
		);
			
	}
}

export default PlanPage;