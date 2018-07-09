import React from 'react';
import PropTypes from 'prop-types';
import SwotElements from './SwotElements';
import SwotTasks from './SwotTasks';

const emptySwotTask = {
  element: '',
  tool: '',
  responsible: '',
  supervisor: '',
  frequency: ''
};

class Swot extends React.Component {

  constructor(props) {
    super(props);
    const swot = props.swot ?
      props.swot :
      {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      };
    this.state = {
      swot,
      swotTasks: props.tasks ? props.tasks : [],
      dropdownsOpen: {
        strengths: false,
        weaknesses: false,
        opportunities: false,
        threats: false
      },
      swotInput: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.swot) {
      this.setState({swot: nextProps.swot});
    }
    if (nextProps.tasks) {
      this.setState({swotTasks: nextProps.tasks});
    }
  }

  toggle(swotElement) {
    const {dropdownsOpen} = this.state;
    dropdownsOpen[swotElement] = !this.state.dropdownsOpen[swotElement];
    this.setState({dropdownsOpen});
  }

  addSwotElement(swotElement) {
    const {swot, dropdownsOpen, swotInput} = this.state;
    swot[swotElement].push(swotInput);
    dropdownsOpen[swotElement] = !this.state.dropdownsOpen[swotElement];
    this.setState({swot, dropdownsOpen, swotInput: ''});
  }

  removeSwotElement(swotElement, index) {
    const {swot} = this.state;
    swot[swotElement].splice(index, 1);
    this.setState({swot});
  }

  handleSwotInputChange(event) {
    this.setState({swotInput: event.target.value});
  }

  handleOnChange(event, index) {
    const { swotTasks } = this.state;
    swotTasks[index][event.target.name] = event.target.value;
    this.setState({swotTasks});
  }

  modifySwotTasks(addSwotTask, index) {
    const { swotTasks } = this.state;
    if (addSwotTask) {
      swotTasks.push(Object.assign({}, emptySwotTask));
    } else {
      swotTasks.splice(index, 1);
    }
    this.setState({swotTasks});
  }

  saveSwot() {
    Meteor.call('insertSwot', this.state.swot, this.state.swotTasks);
  }

	render() {
    if (this.props.loading) {
      return <div />
    }
		return (
			<div className="content-body">
        <div className="row header">
            <div className="col-md-6">
              <h2>FODA</h2>
            </div>
            <div className="col-md-6">
              <button onClick={this.saveSwot.bind(this)}>
                Guardar Cambios
              </button>
            </div>
        </div>
        <SwotElements
          swot={this.state.swot}
          toggle={this.toggle.bind(this)}
          addSwotElement={this.addSwotElement.bind(this)}
          removeSwotElement={this.removeSwotElement.bind(this)}
          handleSwotInputChange={this.handleSwotInputChange.bind(this)}
          dropdownsOpen={this.state.dropdownsOpen}
        />
        <SwotTasks
          swot={this.state.swot}
          swotTasks={this.state.swotTasks}
          handleOnChange={this.handleOnChange.bind(this)}
          modifySwotTasks={this.modifySwotTasks.bind(this)}
        />
			</div>
		);
			
	}
}

Swot.propTypes = {
  loading: PropTypes.bool,
  swot: PropTypes.object,
  tasks: PropTypes.array
};

export default Swot;