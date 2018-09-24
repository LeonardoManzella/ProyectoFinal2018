import React from 'react';
import Board from 'react-trello';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Boards } from '../../../../lib/schemas/board';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserTasks } from '../../../../lib/schemas/userTask';
import { BusinessAreas } from '../../../../lib/schemas/businessArea';
import BinnacleLaneEdition from './BinnacleLaneEdition';
import BinnacleCardEdition from './BinnacleCardEdition';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

let eventBus = undefined;

const setEventBus = (handle) => {
	eventBus = handle;
}

class Binnacle extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			boardData: {
				lanes: props.board ? props.board.lanes : []
			},
			laneModalIsOpen: false,
			cardModalIsOpen: false,
			selectedLaneId: '',
			selectedCardLaneId: '',
			selectedCardId: ''
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
		Meteor.call('boards.update', boardData.lanes);
	}

	addSection(boardData) {
		// laneId que sea la hora de creacion
		boardData.lanes.push({
				title: 'Reunión ' + moment().format('DD/MM/YYYY'),
				id: new Date().toString(),
				label: '',
				currentPage: 1,
				cards: []
			});
		this.setState({boardData});
		eventBus.publish({type: 'UPDATE_LANES', lanes: boardData.lanes})
		Meteor.call('boards.update', boardData.lanes);
	}

	markTask(taskIndex, userTaskId) {
		Meteor.call('boards.markTaskCompleted', taskIndex, userTaskId);
	}

	getBusinessArea(plan) {
		if (plan.businessArea === 'all') {
			return 'Plan general';
		}
		const businessArea = BusinessAreas.findOne({_id: plan.businessArea});
		return businessArea ? businessArea.name : '';
	}

	renderPlanCardTask(task, index, planId) {
		return (
			<div className="section-body" key={index}>
				<div className="section-item">
					<div className="section-item-title">
						<input type="checkbox"
									checked={!!task.completed}
									onChange={() => this.markTask(index, planId)}/>
						<label>{task.taskDescription}</label>
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
						{plan.tasks.filter(task => task.completed).length}
						/
						{plan.tasks.length}
					</span>
				</div>
				{plan.tasks.map((task, taskIndex) =>
					this.renderPlanCardTask(task, taskIndex, plan._id))}
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
						{swot.tasks.filter(task => task.completed).length}
						/
						{swot.tasks.length}
					</span>
				</div>
				{swot.tasks.map((task, taskIndex) =>
					this.renderPlanCardTask(task, taskIndex, swot._id))}
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
						{plan.tasks.filter(task => task.completed).length}
						/
						{plan.tasks.length}
					</span>
				</div>
				{plan.tasks.map((task, taskIndex) =>
					this.renderPlanCardTask(task, taskIndex, plan._id))}
			</div>
		)
	}

	render() {

		let { boardData } = this.state;
		const { plans, swot, contingencyPlan } = this.props;

		if (this.props.loading) {
			return <div />;
		}

		return (
			<div>
				<BinnacleLaneEdition
					modalIsOpen={this.state.laneModalIsOpen}
					changeModalState={() => this.setState({laneModalIsOpen: !this.state.laneModalIsOpen})}
					selectedLaneId={this.state.selectedLaneId}
					boardData={this.state.boardData}
					eventBus={eventBus}
				/>
				<BinnacleCardEdition
					modalIsOpen={this.state.cardModalIsOpen}
					changeModalState={() => this.setState({cardModalIsOpen: !this.state.cardModalIsOpen})}
					selectedCardLaneId={this.state.selectedCardLaneId}
					selectedCardId={this.state.selectedCardId}
					boardData={this.state.boardData}
					eventBus={eventBus}
				/>
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
								{plans.map((plan, index) => this.renderPlanCard(plan, index))}
								{swot.map((swot, index) => this.renderSwotCard(swot, index))}
								{contingencyPlan.map((plan, index) => this.renderContingencyPlanCard(plan, index))}
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
								eventBusHandle={setEventBus}
								onLaneClick={(laneId) => this.setState({laneModalIsOpen: true, selectedLaneId: laneId})}
								onCardClick={(cardId, metadata, laneId) => this.setState({
									cardModalIsOpen: true,
									selectedCardLaneId: laneId,
									selectedCardId: cardId}
								)}
								/>
						</div>
					</div>
				</div>
			</div>
		);
			
	}
}

export default withTracker(() => {
  const boardsSubs = Meteor.subscribe('boards');
	const tasksSubs = Meteor.subscribe('getUserTasks');
  return {
		board: Boards.findOne({userId: Meteor.userId()}),
		plans: UserTasks.find({userId: Meteor.userId(), type: 'plan'}).fetch(),
		swot: UserTasks.find({userId: Meteor.userId(), type: 'swot'}).fetch(),
		contingencyPlan: UserTasks.find({userId: Meteor.userId(), type: 'contingencyPlan'}).fetch(),
		loading: !boardsSubs.ready() || !tasksSubs.ready()
  };
})(Binnacle);