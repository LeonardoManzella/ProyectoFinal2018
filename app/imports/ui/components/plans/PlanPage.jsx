import React from 'react';
import StepZilla from 'react-stepzilla';
import PlanList from './PlanList';
import PropTypes from 'prop-types';
import { push as Menu } from 'react-burger-menu';
import SuggestionsChatbot from '../suggestionsChatbot/SuggestionsChatbot';
import { validationsHelper } from '../../../api/helpers/validationsHelper';



const emptyPlanItem = {
  tool: '',
  responsible: '',
  supervisor: '',
  frequency: '',
  frequencyType: '',
  frequencyValue: '',
  frequencySecondValue: ''
};

const emptyPlan = {
  planArea: '',
  planItems: []
};

const planTypes = [
  {
    name: "PLAN DE ADMINISTRACIÓN",
    title: "DE ADMINISTRACIÓN",
    component: <PlanList/>,
    plan_category: 'management_plan'
  },
  {
    name: "PLAN DE COMUNICACIÓN",
    title: "DE COMUNICACIÓN",
    component: <PlanList/>,
    plan_category: 'communication_plan'
  },
  {
    name: "PLAN COMERCIAL",
    title: "COMERCIALES",
    component: <PlanList/>,
    plan_category: 'commercial_plan'
  }
  /*
  ,
  {
    //TODO agregar codigo referencia Prolog en cada tipo
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
    name: "PLAN ECONÓMICO / FINANCIERO",
    title: "Económicos / Financieros",
    component: <PlanList/>
  },
  {
    name: "PLAN DE SISTEMAS",
    title: "de Sistemas",
    component: <PlanList/>
  }
  */
];

class PlanPage extends React.Component {

  initializePlanTypeList(props, planType) {
    if (props.planTypeList) {
      const newPlanTypeList = props.planTypeList
        .filter(plan => plan.name === planType.name)
        .map(plan => {
          const planItems = plan.data.planItems.map(planItem => ({
            data: planItem,
            errors: validationsHelper.initializePlanListErrors()
          }));
          const newPlan = {
            data: {
              planArea: plan.data.planArea,
              planItems
            },
            editable: plan.editable,
          };
          return newPlan;
        });
      return newPlanTypeList;
    }
    return [];
  }

  constructor(props) {
    super(props);
    const plans = planTypes.map(planType => ({
      name: planType.name,
      planTypeList: this.initializePlanTypeList(props, planType)
    }));
    const INITIAL = 0;
    this.state = {
      plans,
      selectedBusinessArea: '',
      currentStep: INITIAL,
      currentPlan: planTypes[INITIAL].plan_category,
      generalError: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const plans = planTypes.map(planType => ({
      name: planType.name,
      planTypeList: this.initializePlanTypeList(nextProps, planType),
      generalError: ''
    }));
    this.setState({plans, generalError: ''});
  }

  addPlan() {
    const { plans } = this.state;
    const plansAreas = plans[this.state.currentStep].planTypeList.map(planType => planType.data.planArea);
    if (plansAreas.includes(this.state.selectedBusinessArea)) {
      this.setState({generalError: 'Ya existe un plan para esa área.'});
      return;
    }
    const data = Object.assign({}, emptyPlan);
    data.planArea = this.state.selectedBusinessArea;
    data.planItems = [];
    const planItem = {
      data: Object.assign({}, emptyPlanItem),
      errors: validationsHelper.initializePlanListErrors()
    }
    data.planItems.push(planItem);
    const newPlan = {
      data,
      editable: true
    };
    plans[this.state.currentStep].planTypeList.push(newPlan);
    this.setState({plans, generalError: ''});
  }

  changeEditOptionPlan(index) {
    const { plans } = this.state;
    plans[this.state.currentStep].planTypeList[index].editable =
      !this.state.plans[this.state.currentStep].planTypeList[index].editable;
    this.setState({plans, generalError: ''});
  }

  deletePlan(index) {
    const { plans } = this.state;
    plans[this.state.currentStep].planTypeList.splice(index, 1);
    this.setState({plans, generalError: ''});
  }

  // FIXME
  handleOnChange(event, index, indexPlanItem) {
    const { plans } = this.state;
    if (event.target.name === 'frequency') {
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequency = event.target.value;
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequencyType = '';
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequencyValue = '';
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequencySecondValue = '';
    } 
    else if (event.target.name === 'frequencyType') {
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequencyType = event.target.value;
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequencyValue = '';
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data.frequencySecondValue = '';
    }
    else {
      plans[this.state.currentStep].planTypeList[index].data
        .planItems[indexPlanItem].data[event.target.name] = event.target.value;
    }
    if (plans[this.state.currentStep].planTypeList[index].data
      .planItems[indexPlanItem].errors[event.target.name]) {
        plans[this.state.currentStep].planTypeList[index].data
          .planItems[indexPlanItem].errors[event.target.name].message = '';
    }
    this.setState({plans, generalError: ''});
  }

  modifyPlanItemsList(index, addPlanItem, indexPlanItem) {
    const { plans } = this.state;
    if (addPlanItem) {
      const planItem = {
        data: Object.assign({}, emptyPlanItem),
        errors: validationsHelper.initializePlanListErrors()
      }
      plans[this.state.currentStep].planTypeList[index].data
        .planItems.push(planItem);
    } else {
      plans[this.state.currentStep].planTypeList[index].data
        .planItems.splice(indexPlanItem, 1);
    }
    this.setState({plans, generalError: ''});
  }

  savePlans() {
    const { plans } = this.state;
    let plansHaveErrors = false;
    plans.forEach(plan => {
      plan.planTypeList.forEach(planType => {
        planType.data.planItems.forEach(planItem => {
          const { hasErrors, newErrors } = validationsHelper.getProjectErrors(planItem.data, planItem.errors);
          plansHaveErrors = hasErrors ? hasErrors : plansHaveErrors;
          planItem.errors = newErrors;
        });
      });
    });
    if (plansHaveErrors) {
      this.setState({
        plans,
        generalError: 'Error al guardar cambios. Verifique los datos ingresados.'
      });
      return;
    }
    const previousStatus = Meteor.user().personalInformation.status;
    Meteor.call('insertNewPlanList', this.state.plans, (error) => {
      if (error) {
        console.log(error);
        this.setState({
          generalError: 'Error del servidor.'
        });
        return;
      }
      if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
        previousStatus === 'pendingPlans') {
        FlowRouter.go('home');
      }
    });
  }

  adjustScreen(event) {
    if (event.isOpen) {
      document.getElementById("page-wrap").setAttribute("class", "page-wrapper");
    } else {
      document.getElementById("page-wrap").removeAttribute("class", "page-wrapper");
    }
  }

  getBurgerIcon() {
    return (
      <div>
        <img src="/img/chatbot.png" />
      </div>
    );
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
          businessAreas={this.props.businessAreas}
        />
      );
      return newStep;
    });
		return (
      <div>
        <div className="chatbot-menu">
          <Menu
            onStateChange={this.adjustScreen.bind(this)}
            customBurgerIcon={this.getBurgerIcon()}
            right noOverlay
          >
            <SuggestionsChatbot current_plan_prop={this.state.currentPlan}/>
          </Menu>
        </div>
        <div className="content-body plan">
          <p className='italic-proyectos text-danger'> {this.state.generalError} </p>
          <div className='step-progress'>
            <StepZilla
              steps={steps}
              nextButtonText='Siguiente'
              backButtonText='Anterior'
              // prevBtnOnLastStep={false}
              backButtonCls='backButtonClass'
              nextButtonCls='nextButtonClass'
              onStepChange={(step) => {
                if (!step) {
                  return;
                }
                this.setState({
                  currentStep: step ? step : this.state.currentStep,
                  currentPlan: step ? planTypes[step].plan_category : this.state.currentPlan
                });
              }}
            />
          </div>
        </div>
      </div>
		);
			
	}
}

PlanPage.propTypes = {
  loading: PropTypes.bool,
  planTypeList: PropTypes.array,
  businessAreas: PropTypes.array
};

PlanPage.defaultProps = {
  planTypeList: []
};

export default PlanPage;