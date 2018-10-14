import React from 'react';
import StepZilla from 'react-stepzilla';
import PlanList from './PlanList';
import PropTypes from 'prop-types';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
  ,
  {
    name: "PLAN LEGAL",
    title: "Legales",
    component: <PlanList/>,
    plan_category: 'legal_plan'
  },
  {
    name: "PLAN DE MARKETING",
    title: "Marketing",
    component: <PlanList/>,
    plan_category: 'marketing_plan'
  }
];

class PlanPage extends React.Component {

  getTitle(title) {
    switch(title) {
      case 'management_plan':
        return 'PLAN DE ADMINISTRACIÓN';
      case 'communication_plan':
        return 'PLAN DE COMUNICACIÓN';
      case 'commercial_plan':
        return 'PLAN COMERCIAL';
      case 'legal_plan':
        return 'PLAN LEGAL';
      case 'marketing_plan':
        return 'PLAN DE MARKETING';
      default:
        return 'PLAN DE ADMINISTRACIÓN';
    }
  }

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
      selectedBusinessArea: 'all',
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
    const planName = this.props.planName;
    const planType = this.state.plans.find(plan => plan.name === this.getTitle(planName));
    const data = Object.assign({}, emptyPlan);
    data.planArea = this.state.selectedBusinessArea;
    data.planItems = [];
    const planItem = {
      data: Object.assign({}, emptyPlanItem),
      errors: validationsHelper.initializePlanListErrors()
    }
    data.planItems.push(planItem);
    const newPlanData = {
      data,
      editable: true
    };
    this.setState({
      plans: plans.map(plan => {
        const newPlan = Object.assign({}, plan);
        if (plan.name === this.getTitle(planName)) {
          newPlan.planTypeList.push(newPlanData);
        }
        return newPlan;
      }),
      generalError: ''
    });
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

  handleOnChange(event, index, indexPlanItem) {
    const { plans } = this.state;
    const planName = this.props.planName;
    const planType = this.state.plans.find(plan => plan.name === this.getTitle(planName));
    planType.planTypeList[index].data
      .planItems[indexPlanItem].data[event.target.name] = event.target.value;
    if (planType.planTypeList[index].data
      .planItems[indexPlanItem].errors[event.target.name]) {
        planType.planTypeList[index].data
          .planItems[indexPlanItem].errors[event.target.name].message = '';
    }
    this.setState({plans, generalError: ''});
  }

  saveReminder(data, index, indexPlanItem) {
    const { plans } = this.state;
    const planName = this.props.planName;
    const planType = this.state.plans.find(plan => plan.name === this.getTitle(planName));
    planType.planTypeList[index].data
      .planItems[indexPlanItem].data.frequency = data.frequency;
    planType.planTypeList[index].data
      .planItems[indexPlanItem].data.frequency = data.frequencyType;
    planType.planTypeList[index].data
      .planItems[indexPlanItem].data.frequency = data.frequencyValue;
    planType.planTypeList[index].data
      .planItems[indexPlanItem].data.frequency = data.frequencySecondValue;
    this.setState({plans, generalError: ''});
  }

  modifyPlanItemsList(index, addPlanItem, indexPlanItem) {
    const { plans } = this.state;
    const planName = this.props.planName;
    const planType = this.state.plans.find(plan => plan.name === this.getTitle(planName));
    if (addPlanItem) {
      const planItem = {
        data: Object.assign({}, emptyPlanItem),
        errors: validationsHelper.initializePlanListErrors()
      }
      planType.planTypeList[index].data
        .planItems.push(planItem);
    } else {
      planType.planTypeList[index].data
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
    Meteor.call('insertNewPlanList', this.state.plans, (error) => {
      if (error) {
        console.log(error);
        this.setState({
          generalError: 'Error del servidor.'
        });
        return;
      }
    });
  }

  renderContinueButton() {
    const previousStatus = Meteor.user().personalInformation.status;
    if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
      previousStatus === 'pendingPlans') {
      return <button className='pink-button' onClick={() => {
        Meteor.call('changePlanPendingStatus', (error) => {
          if (!error) {
            FlowRouter.go('home');
          }
        });
      }}>Avanzar</button>
    }
    return '';
  }

	render() {
    // let steps = Object.assign([], planTypes);
    // steps = steps.map((step, index) => {
    //   const newStep = Object.assign({}, step);
    //   newStep.component = (
    //     <PlanList
    //       title={step.title}
    //       planTypeList={this.state.plans[index].planTypeList}
    //       addPlan={this.addPlan.bind(this)}
    //       changeEditOptionPlan={this.changeEditOptionPlan.bind(this)}
    //       deletePlan={this.deletePlan.bind(this)}
    //       handleOnChange={this.handleOnChange.bind(this)}
    //       modifyPlanItemsList={this.modifyPlanItemsList.bind(this)}
    //       handleSelectChange={(e) => this.setState({'selectedBusinessArea': e.target.value})}
    //       savePlans={this.savePlans.bind(this)}
    //       businessAreas={this.props.businessAreas}
    //     />
    //   );
    //   return newStep;
    // });
    // console.log(this.props.planName);
    if (this.props.planName) {
      const planName = this.props.planName;
      const planType = this.state.plans.find(plan => plan.name === this.getTitle(planName));
      return (
        <div>
          <div className="content-body plan">
            <PlanList
              title={planName}
              planTypeList={planType.planTypeList}
              addPlan={this.addPlan.bind(this)}
              changeEditOptionPlan={this.changeEditOptionPlan.bind(this)}
              deletePlan={this.deletePlan.bind(this)}
              handleOnChange={this.handleOnChange.bind(this)}
              modifyPlanItemsList={this.modifyPlanItemsList.bind(this)}
              handleSelectChange={(e) => this.setState({'selectedBusinessArea': e.target.value})}
              savePlans={this.savePlans.bind(this)}
              businessAreas={this.props.businessAreas}
              saveReminder={this.saveReminder.bind(this)}
            />
          </div>
        </div>
      );
    }
		return (
      <div>
        <div className="content-body plan">
          <div className="row header">
            <div className="col-md-6">
              <h2>{'Planes'}</h2>
            </div>
            <div className="col-md-6">
              { this.renderContinueButton() }
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <a onClick={() => FlowRouter.go('planList', {}, {planName: 'management_plan'})}>
                <div className="plan-card">
                  <h2> PLAN DE ADMINISTRACIÓN </h2>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a onClick={() => FlowRouter.go('planList', {}, {planName: 'communication_plan'})}>
                <div className="plan-card">
                  <h2> PLAN DE COMUNICACIÓN </h2>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a onClick={() => FlowRouter.go('planList', {}, {planName: 'commercial_plan'})}>
                <div className="plan-card">
                  <h2> PLAN COMERCIAL </h2>
                </div>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-4">
              <a onClick={() => FlowRouter.go('planList', {}, {planName: 'legal_plan'})}>
                <div className="plan-card">
                  <h2> PLAN LEGAL </h2>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a onClick={() => FlowRouter.go('planList', {}, {planName: 'marketing_plan'})}>
                <div className="plan-card">
                  <h2> PLAN DE MARKETING </h2>
                </div>
              </a>
            </div>
            <div className="col-md-2" />
          </div>
          {/* <p className='italic-proyectos text-danger'> {this.state.generalError} </p>
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
          </div> */}
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