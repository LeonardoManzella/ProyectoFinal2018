import React from 'react';
import PropTypes from 'prop-types';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import RisksTable from './RisksTable';
import RisksContingencyPlans from './RisksContingencyPlans';

class RisksPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      risks: props.risks ? props.risks : [],
      contingencyPlans: props.contingencyPlans ? props.contingencyPlans : []
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