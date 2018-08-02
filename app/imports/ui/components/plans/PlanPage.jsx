import React from 'react';
import StepZilla from 'react-stepzilla';
import PlanList from './PlanList';
import PropTypes from 'prop-types';
import { push as Menu } from 'react-burger-menu';
import SuggestionsChatbot from '../suggestionsChatbot/SuggestionsChatbot';

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
    const INITIAL = 0;
    this.state = {
      plans,
      selectedBusinessArea: '',
      currentStep: INITIAL,
      currentPlan: planTypes[INITIAL].plan_category
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
          <div className='step-progress'>
            <StepZilla
              steps={steps}
              nextButtonText='Siguiente'
              backButtonText='Anterior'
              // prevBtnOnLastStep={false}
              backButtonCls='backButtonClass'
              nextButtonCls='nextButtonClass'
              onStepChange={(step) => this.setState({currentStep: step, currentPlan: planTypes[step].plan_category})}
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