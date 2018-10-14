import React from 'react';
import PropTypes from 'prop-types';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import RisksTable from './RisksTable';
import RisksContingencyPlans from './RisksContingencyPlans';
import Reminder from '../plans/Reminder';

class RisksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      risks: props.risks ? props.risks : [],
      contingencyPlans: props.contingencyPlans ? props.contingencyPlans : [],
      modalIsOpen: false,
      selectedRiskIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.risks) {
      this.setState({risks: nextProps.risks});
    }
    if (nextProps.contingencyPlans) {
      this.setState({contingencyPlans: nextProps.contingencyPlans});
    }
  }

  handleOnChange(event, table, index) {
    const tableElements = this.state[table];
    tableElements[index][event.target.name] = event.target.value;
    this.setState({[table]: tableElements});
  }

  saveReminder(data, index) {
    const { contingencyPlans } = this.state;
    contingencyPlans[index].frequency = data.frequency;
    contingencyPlans[index].frequencyType = data.frequencyType;
    contingencyPlans[index].frequencyValue = data.frequencyValue;
    contingencyPlans[index].frequencySecondValue = data.frequencySecondValue;
    this.setState({contingencyPlans});
  }

  addElementToTable(table, emptyElement) {
    const tableElements = this.state[table];
    tableElements.push(Object.assign({}, emptyElement));
    this.setState({[table]: tableElements});
  }

  removeElementFromTable(table, index) {
    const tableElements = this.state[table];
    tableElements.splice(index, 1);
    this.setState({[table]: tableElements});
  }

  saveRisks() {
    Meteor.call('insertRisks', this.state.risks, this.state.contingencyPlans);
  }

	render() {
    if (this.props.loading) {
      return <div />
    }
		return (
			<div className="content-body">
        <Reminder
          data={this.state.contingencyPlans[this.state.selectedRiskIndex] || {}}
          saveReminder={(data) => this.saveReminder(data, this.state.selectedRiskIndex)}
          modalIsOpen={this.state.modalIsOpen}
          changeModalState={() => this.setState({modalIsOpen: !this.state.modalIsOpen})}
        />
        <div className="row header">
            <div className="col-md-6">
              <h2>Riesgos</h2>
            </div>
            <div className="col-md-6">
              <button onClick={this.saveRisks.bind(this)}>
                Guardar Cambios
              </button>
            </div>
        </div>
        <RisksTable
          risks={this.state.risks}
          handleOnChange={this.handleOnChange.bind(this)}
          removeElementFromTable={this.removeElementFromTable.bind(this)}
          addElementToTable={this.addElementToTable.bind(this)}
        />
        <RisksContingencyPlans
          risks={this.state.risks}
          contingencyPlans={this.state.contingencyPlans}
          handleOnChange={this.handleOnChange.bind(this)}
          removeElementFromTable={this.removeElementFromTable.bind(this)}
          addElementToTable={this.addElementToTable.bind(this)}
          selectRisk={(index) => this.setState({selectedRiskIndex: index, modalIsOpen: true})}
        />
			</div>
		);
	}
}

RisksPage.propTypes = {
  loading: PropTypes.bool,
  risks: PropTypes.array,
  contingencyPlans: PropTypes.array
};

export default RisksPage;