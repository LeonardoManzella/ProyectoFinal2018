import React from 'react';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { push as Menu } from 'react-burger-menu';
import SuggestionsChatbot from '../suggestionsChatbot/SuggestionsChatbot';
import ChatbotButtonPointer from './ChatbotButtonPointer'

class PlanList extends React.Component {

  constructor(props) {
    super(props);
    if (props.planTypeList.length === 0) {
      props.addPlan();
    }
    const userHasClickedChatbotButton = Meteor.users.findOne()
      .personalInformation.hasClickedChatbotButton;
    this.state = {
      showChatbotButtonPoint: !userHasClickedChatbotButton
    }
  }

  checkEntrepreneurStatus() {
    return (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
      Meteor.user() && Meteor.user().personalInformation.status === 'pendingPlans');
  }

  getCurrentPlan(title) {
    switch(title) {
      case 'management_plan':
        return 'Plan de administración';
      case 'communication_plan':
        return 'Plan de comunicación';
      case 'commercial_plan':
        return 'Plan comercial';
      case 'legal_plan':
        return 'Plan legal';
      case 'marketing_plan':
        return 'Plan de marketing';
      default:
        return 'Plan de administración';
    }
  }


  hideChatbotButtonPointer() {
    if(this.state.showChatbotButtonPoint){
      this.setState({showChatbotButtonPoint: false});

      Meteor.call('setHasClickedChatbotButton', Meteor.users.findOne(),(error) => {
        if (error) {
          console.log(error);
          this.setState({
            generalError: 'Error del servidor.'
          });
          return;
        }
      });
    }
  }

  adjustScreen(event) {
    if (event.isOpen) {
      this.hideChatbotButtonPointer();
      document.getElementById("page-wrap").setAttribute("class", "page-wrapper");
    } else {
      document.getElementById("page-wrap").removeAttribute("class", "page-wrapper");
    }
  }

  getBurgerIcon() {
    return (
      <div>
        <img style={{width: "60px", height: "60px"}} src="/img/chatbot.png" />
      </div>
    );
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
      businessAreas,
      saveReminder
    } = this.props;
    const isEditable = true;
    return (
      <div>
        {this.state.showChatbotButtonPoint ? (
          <ChatbotButtonPointer />) : ''
        }
        <div className="chatbot-menu">
          <Menu
            onStateChange={this.adjustScreen.bind(this)}
            customBurgerIcon={this.getBurgerIcon()}
            right noOverlay
          >
            <SuggestionsChatbot current_plan_prop={title}/>
          </Menu>
        </div>
        <div className="row header">
          <div className="col-md-6">
            <h2>{ this.getCurrentPlan(title) }</h2>
          </div>
          <div className="col-md-6">
            <button onClick={savePlans}>
              Guardar Cambios
            </button>
            <button onClick={() => FlowRouter.go('planList')}>
              Volver
            </button>
            {/* <button onClick={addPlan}>
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
            </select> */}
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
              saveReminder={(data, itemIndex) => saveReminder(data, index, itemIndex)}
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
  businessAreas: PropTypes.array,
  saveReminder: PropTypes.func
};

export default PlanList;