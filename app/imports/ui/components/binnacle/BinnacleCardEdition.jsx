import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

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

class BinnacleCardEdition extends React.Component {

  constructor(props) {
    super(props);
    const lane = props.boardData.lanes.find((lane) => lane.id === props.selectedCardLaneId);
    const card = lane ? lane.cards.find((card) => card.id === props.selectedCardId) : lane;
    this.state = {
      title: card ? card.title : '',
      description: card ? card.description : '',
    };
  }

  componentWillReceiveProps(props) {
    const lane = props.boardData.lanes.find((lane) => lane.id === props.selectedCardLaneId);
    const card = lane ? lane.cards.find((card) => card.id === props.selectedCardId) : lane;
    this.setState({
      title: card ? card.title : '',
      description: card ? card.description : '',
    });
  }

  editSection() {
    const newLanes = this.props.boardData.lanes.map((lane) => {
      const newLane = Object.assign({}, lane);
      if (lane.id === this.props.selectedCardLaneId) {
        newLane.cards = lane.cards.map(card => {
          const newCard = Object.assign({}, card);
          if (card.id === this.props.selectedCardId) {
            newCard.title = this.state.title;
            newCard.description = this.state.description;
          }
          return newCard;
        })
      }
      return newLane;
    });
		this.props.eventBus.publish({type: 'UPDATE_LANES', lanes: newLanes})
		Meteor.call('boards.update', newLanes);
  }
  
	render() {

    const { modalIsOpen, changeModalState } = this.props;

		return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={changeModalState}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="bm-cross-button menu-cross-button">
          <span className="cross">
            <span className="bm-cross bm-cross-left">
            </span>
            <span className="bm-cross bm-cross-right">
            </span>
          </span>
          <button onClick={changeModalState}>close</button>
        </div>
        <div className="card-edition">
          <h4> Edición de Card </h4>
          <div className="row">
            <p> Title:</p>
            <input
              className='dropdown-input'
              onChange={(e) => this.setState({title: e.target.value})}
              value={this.state.title}
            />
          </div> 
          <div className="row">
            <p> Description:</p>
            <input
              className='dropdown-input'
              onChange={(e) => this.setState({description: e.target.value})}
              value={this.state.description}
            />
          </div> 
          <div className="row">
            <button className="pink-button" onClick={() => {
              this.editSection();
              changeModalState();
            }}>Guardar Cambios</button>
          </div> 
        </div>
      </Modal>
		);
			
	}
}

export default BinnacleCardEdition;