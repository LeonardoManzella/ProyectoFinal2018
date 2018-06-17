import React from 'react';
import StepZilla from 'react-stepzilla';
import PlanList from './PlanList';

const Step1 = props => {
  return (
    <div>
      <div>Step 1</div>
    </div>
  );
};

const steps = [
  {
    name: "PLAN DE COMUNICACIÓN",
    component: <PlanList />
  },
  {
    name: "PLAN COMERCIAL",
    component: <PlanList />
  },
  {
    name: "PLAN DE SISTEMAS",
    component: <PlanList />
  }
];

class PlanPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plans: []
    };
  }

	render() {
		return (
			<div className="content-body plan">
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            nextButtonText='Siguiente'
            backButtonText='Anterior'
            backButtonCls='backButtonClass'
            nextButtonCls='nextButtonClass'
          />
        </div>
			</div>
		);
			
	}
}

export default PlanPage;