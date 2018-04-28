import React from 'react'
import Board from 'react-trello'
import { Boards } from '../../../../lib/schemas/board';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class Binnacle extends React.Component {
	
	constructor(props) {
    super(props);
    Meteor.call('boards.insertFirstTime');
  }

	onDataChange(boardData) {
		
		console.log("this is boardData lanes: " + boardData.lanes);

		console.log();
		
		Meteor.call('boards.update', this.props.board._id ,boardData.lanes);
	}

	render() {

		if (!this.props.board) {
			return '';
		}

		let boardData = {};
		boardData.lanes = this.props.board.lanes

		return  <Board 
			onDataChange={this.onDataChange.bind(this)}
			data={boardData}
			draggable={true}
			editable={true} 
			/>
			
	}
}

export default withTracker(() => {
  Meteor.subscribe('boards');

  return {
    board: Boards.find({}).fetch()[0]
  };
})(Binnacle);