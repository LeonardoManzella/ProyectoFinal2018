import React from 'react'
import Board from 'react-trello'
import { Boards } from '../../../../lib/schemas/board';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class Binnacle extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			boardData: {
				lanes: props.board ? props.board.lanes : []
			}
		};
    Meteor.call('boards.insertFirstTime');
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
		boardData.lanes.push({
				title: 'Reunión',
				laneId: 'laneId',
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

	renderUserTaskCard() {
		return (
			<div className="section-container">
				<div className="section-header">
					<span className="section-title">
						Plan Administrativo
					</span>
					<span className="section-completed">
						1/2
					</span>
				</div>
				<div className="section-body">
					<div className="section-item">
						<div className="section-item-title">
							<input type="checkbox" id="scales" name="feature"
										value="scales" checked />
							<label for="scales">Tarea1</label>
						</div>
						<div className="description">
							<p>Responsable: Nicole </p>
							<p>Responsable: Nicole </p>
						</div>
					</div>
				</div>
				<div className="section-body">
					<div className="section-item">
						<input type="checkbox" id="scales" name="feature"
									value="scales" checked />
						<label for="scales">Tarea2</label>
					</div>
				</div>
				<div className="section-body">
					<div className="section-item">
						<input type="checkbox" id="scales" name="feature"
									value="scales" checked />
						<label for="scales">Tarea3</label>
					</div>
				</div>
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
							{this.renderUserTaskCard()}
							{this.renderUserTaskCard()}
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
							draggable={true}
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

  return {
    board: Boards.findOne({userId: Meteor.userId()})
  };
})(Binnacle);