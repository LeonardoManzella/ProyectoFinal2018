import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { validationsHelper } from '../../../api/helpers/validationsHelper';
import { frequencyTime } from '../../../api/helpers/frequency';

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

class Reminder extends React.Component {

  constructor(props) {
    super(props);
    const data = props.planItems[props.selectedPlanItemIndex].data;
    this.state = {
      frequency: data.frequency || '',
      frequencyType: data.frequencyType || '',
      frequencyValue: data.frequencyValue || '',
      frequencySecondValue: data.frequencySecondValue || '',
      generalError: ''
    };
  }

  componentWillReceiveProps(props) {
    const data = props.planItems[props.selectedPlanItemIndex].data;
    this.setState({
      frequency: data.frequency || '',
      frequencyType: data.frequencyType || '',
      frequencyValue: data.frequencyValue || '',
      frequencySecondValue: data.frequencySecondValue || '',
      generalError: ''
    });
  }

  handleOnChange(event, index, indexPlanItem) {
    if (event.target.name === 'frequency') {
      this.setState({
        frequency: event.target.value,
        frequencyType: '',
        frequencyValue: '',
        frequencySecondValue: '',
        generalError: ''
      });
    } else if (event.target.name === 'frequencyType') {
      this.setState({
        frequencyType: event.target.value,
        frequencyValue: '',
        frequencySecondValue: '',
        generalError: ''
      });
    }  else {
      this.setState({[event.target.name]: event.target.value, generalError: ''});
    }
  }

  getOption(frequencyType, frequencyTypeOptions, fieldName) {
    if (frequencyType === 'input') {
      return  (
        <input
          className="frequency"
          name={fieldName}
          value={this.state[fieldName]}
          onChange={this.handleOnChange.bind(this)}
        />
      );
    } else if (frequencyType === 'select') {
      return (
        <select
          name={fieldName}
          value={this.state[fieldName]}
          onChange={this.handleOnChange.bind(this)}
        >
          <option value="">-</option>
          {frequencyTypeOptions.map((frequencyOption, index) => (
            <option key={index} value={frequencyOption.value}>{frequencyOption.name}</option>
          ))}
        </select>
      );
    }
    return '';
  }

  getFrequencyThirdOption(planItem, selectedPlanItemIndex) {
    if (this.state.frequency !== '' && this.state.frequencyType !== '') {
      const time = frequencyTime.find(time => time.value === this.state.frequency);
      const frequencyType = time ?
        time.types.find(type => type.value === this.state.frequencyType) : time;
      if (frequencyType) {
        return (
          <div>
            <div className="row">
              <div className="col-md-2">
                <p>Valor: </p>
              </div>
              <div className="col-md-10">
                <div>
                  <div className="row">
                    <div>
                      {this.getOption(frequencyType.type, frequencyType.options, 'frequencyValue')}
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {this.getOption(frequencyType.secondType, frequencyType.secondOptions, 'frequencySecondValue')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return '';
    }
    return '';
  }

  saveReminder() {
    if (this.state.frequency === '' || this.state.frequencyType === '' || this.state.frequencyValue ===  '') {
      this.setState({generalError: 'Debe completar todos los campos'});
      return;
    }
    this.props.saveReminder(this.state);
    this.props.changeModalState();
  }

	render() {
    const { selectedPlanItemIndex, planItems, handleOnChange, modalIsOpen, changeModalState } = this.props;
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={changeModalState}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="reminder-modal">
          {/* <div className="bm-cross-button menu-cross-button">
            <span className="cross">
              <span className="bm-cross bm-cross-left">
              </span>
              <span className="bm-cross bm-cross-right">
              </span>
            </span>
            <button onClick={changeModalState}>close</button>
          </div> */}
          <div className="col-md-12">
            <h4>Recordatorio</h4>
          </div>
          <div>
            <div className="row">
              <div className="col-md-2">
                <p> Repetir </p>
              </div>
              <div className="col-md-10">
                <select
                  placeholder="Ej: Cada 2 días"
                  name='frequency'
                  onChange={this.handleOnChange.bind(this)}
                  value={this.state.frequency}
                >
                  <option value="">-</option>
                  {
                    frequencyTime.map((time, index) => (
                      <option key={index} value={time.value}>{time.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-2">
                <p> Según: </p>
              </div>
              <div className="col-md-10">
                <select
                  placeholder="Ej: Cada 2 días"
                  name='frequencyType'
                  onChange={this.handleOnChange.bind(this)}
                  value={this.state.frequencyType}
                >
                  <option value="">-</option>
                  {
                    this.state.frequency &&
                      this.state.frequency !== "" &&
                      frequencyTime.find(time => time.value === this.state.frequency) ?
                      frequencyTime.find(time => time.value === this.state.frequency)
                        .types.map((type, index) =>
                        <option value={type.value} key={index}>{type.name}</option>)
                      : ''
                  }
                </select>
              </div>
            </div>
          </div>
          {this.getFrequencyThirdOption(planItems[selectedPlanItemIndex], selectedPlanItemIndex)}
          <p className='small italic-proyectos text-danger'>
            {this.state.generalError}
          </p>
          <div className="col-md-12 save-reminders">
            <button className='pink-button' onClick={this.saveReminder.bind(this)}>Guardar</button>
            <button className='pink-button' onClick={changeModalState}>Cancelar</button>
          </div>
        </div>
      </Modal>
    );

  }
}

Reminder.propTypes = {
  selectedPlanItemIndex: PropTypes.number,
  planItems: PropTypes.array,
  modalIsOpen: PropTypes.bool,
  changeModalState: PropTypes.func,
  saveReminder: PropTypes.func
};

export default Reminder;