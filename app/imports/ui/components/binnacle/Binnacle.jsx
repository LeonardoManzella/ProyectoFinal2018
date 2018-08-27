import React from 'react'
import Board from 'react-trello'
import { Boards } from '../../../../lib/schemas/board';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';

class Binnacle extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			boardData: {
				lanes: props.board ? props.board.lanes : []
			}
		};
  }

	componentWillReceiveProps(nextProps) {
		this.setState({
			boardData: {
				lanes: nextProps.board ? nextProps.board.lanes : []
			}
		});
	}

	onDataChange(boardData) {
		
		console.log("this is boardData lanes: " + boardData.lanes);
		
		Meteor.call('boards.update', this.props.board ,boardData.lanes);
	}

	addSection(boardData) {
		// laneId que sea la hora de creacion
		boardData.lanes.push({
				title: 'Reunión',
				laneId: new Date(),
				label: '2/2',
				currentPage: 1,
				cards: [
					{id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
					{id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
				]
			});
		this.setState({boardData});
		Meteor.call('boards.update', this.props.board, boardData.lanes);
	}

	getBusinessArea(plan) {
		if (plan.businessArea === 'all') {
			return 'Plan general';
		}
		const businessArea = BusinessAreas.findOne({_id: plan.businessArea});
		return businessArea ? businessArea.name : '';
	}

	renderPlanCardTask(task, index) {
		return (
			<div className="section-body">
				<div className="section-item" key={index}>
					<div className="section-item-title">
						<input type="checkbox" id="scales" name="feature"
									value="scales" checked={true} />
						<label htmlFor="scales">{task.taskDescription}</label>
					</div>
					<div className="description">
						<p>{'Responsable: ' + task.responsibleID}</p>
						<p>{'Supervisor: ' + task.supervisorID}</p>
					</div>
				</div>
			</div>
		);
	}

	renderPlanCard(plan, index) {
		return (
			<div className="section-container" key={index}>
				<div className="section-header">
					<span className="section-title">
						{plan.subtype + ' - ' + this.getBusinessArea(plan)}
					</span>
					<span className="section-completed">
						1/2
					</span>
				</div>
				{plan.tasks.map((task, taskIndex) => this.renderPlanCardTask(task, taskIndex))}
			</div>
		)
	}

	renderSwotCard(swot, index) {
		return (
			<div className="section-container" key={index}>
				<div className="section-header">
					<span className="section-title">
						Matriz FODA
					</span>
					<span className="section-completed">
						1/2
					</span>
				</div>
				{swot.tasks.map((task, taskIndex) => this.renderPlanCardTask(task, taskIndex))}
			</div>
		)
	}

	renderContingencyPlanCard(plan, index) {
		return (
			<div className="section-container" key={index}>
				<div className="section-header">
					<span className="section-title">
						Plan de Contingencia
					</span>
					<span className="section-completed">
						1/2
					</span>
				</div>
				{plan.tasks.map((task, taskIndex) => this.renderPlanCardTask(task, taskIndex))}
			</div>
		)
	}

	render() {

		let { boardData } = this.state;

		return (
			<div className="content-body binnacle">
				<h2>Bitácora</h2>
				<div className="row">
					<div className="col-md-4">
						<div className="row header">
							<div className="col-md-6">
								<h3>Lista de Tareas</h3>
							</div>
						</div>
						<div className="board-container">
							{this.props.plans.map((plan, index) => this.renderPlanCard(plan, index))}
							{this.props.swot.map((swot, index) => this.renderSwotCard(swot, index))}
							{this.props.contingencyPlan.map((plan, index) => this.renderContingencyPlanCard(plan, index))}
						</div>
					</div>
					<div className="col-md-8"> 
						<div className="row header">
							<div className="col-md-6">
								<h3>Reuniones</h3>
							</div>
							<div className="col-md-6 actions">
								<a className="icon" onClick={() => this.addSection(boardData)}>
									<img src='/img/add.svg'/>
									Agregar Reunión
								</a>
							</div>
						</div>
						<Board 
							onDataChange={this.onDataChange.bind(this)}
							data={boardData}
							draggable
							laneDraggable={true}
							editable={true} 
							/>
					</div>
				</div>
			</div>
		);
			
	}
}

export default withTracker(() => {
  Meteor.subscribe('boards');
	Meteor.subscribe('getUserTasks');
  return {
		board: Boards.findOne({userId: Meteor.userId()}),
		plans: UserTasks.find({userId: Meteor.userId(), type: 'plan'}),
		swot: UserTasks.find({userId: Meteor.userId(), type: 'swot'}),
		contingencyPlan: UserTasks.find({userId: Meteor.userId(), type: 'contingencyPlan'})
  };
})(Binnacle);