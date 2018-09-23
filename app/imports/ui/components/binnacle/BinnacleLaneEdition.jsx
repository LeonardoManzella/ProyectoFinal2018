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

class BinnacleLaneEdition extends React.Component {

  constructor(props) {
    super(props);
    const lane = props.boardData.lanes.find((lane) => lane.id === props.selectedLaneId);
    this.state = {
      title: lane ? lane.title : ''
    };
  }

  componentWillReceiveProps(props) {
    const lane = props.boardData.lanes.find((lane) => lane.id === props.selectedLaneId);
    this.setState({
      title: lane ? lane.title : ''
    });
  }

  editSection() {
    const newLanes = this.props.boardData.lanes.map((lane) => {
      const newLane = Object.assign({}, lane);
      if (lane.id === this.props.selectedLaneId) {
        newLane.title = this.state.title;
      }
      return newLane;
    });
		this.props.eventBus.publish({type: 'UPDATE_LANES', lanes: newLanes})
		Meteor.call('boards.update', newLanes);
  }
  
  deleteSection() {
    const newLanes = this.props.boardData.lanes.filter(lane => lane.id !== this.props.selectedLaneId);
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
        <div>
          <h4> Edición de Reunión </h4>
          <div className="row">
            <input
              className='dropdown-input'
              onChange={(e) => this.setState({title: e.target.value})}
              value={this.state.title}/>
          </div> 
          <div className="row">
            <button className="pink-button" onClick={() => {
              this.editSection();
              changeModalState();
            }}>Guardar Cambios</button>
            <button className="pink-button" onClick={() => {
              this.deleteSection();
              changeModalState();
            }}>Eliminar Reunión</button>
          </div> 
        </div>
      </Modal>
		);
			
	}
}

export default BinnacleLaneEdition;