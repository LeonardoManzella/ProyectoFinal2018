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

  getOption(frequencyType, frequencyTypeOptions, fieldName, index) {
    if (frequencyType === 'input') {
      return  (
        <input
          className="frequency"
          name={fieldName}
          value={this.props.planItems[index].data[fieldName]}
          onChange={this.props.handleOnChange}
        />
      );
    } else if (frequencyType === 'select') {
      return (
        <select
          name={fieldName}
          value={this.props.planItems[index].data[fieldName]}
          onChange={this.props.handleOnChange}
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
    if (planItem.data.frequency !== '' && planItem.data.frequencyType !== '') {
      const time = frequencyTime.find(time => time.value === planItem.data.frequency);
      const frequencyType = time ?
        time.types.find(type => type.value === planItem.data.frequencyType) : time;
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
                      {this.getOption(frequencyType.type, frequencyType.options, 'frequencyValue', selectedPlanItemIndex)}
                    </div>
                    <p className='small italic-proyectos text-danger'>
                      {
                        planItem.errors.frequencyValue ?
                          validationsHelper.getErrorMessage(planItem.errors.frequencyValue.message)
                        : ''
                      }
                    </p>
                  </div>
                  <div className="row">
                    <div>
                      {this.getOption(frequencyType.secondType, frequencyType.secondOptions, 'frequencySecondValue', selectedPlanItemIndex)}
                    </div>
                    <p className='small italic-proyectos text-danger'>
                      {
                        planItem.errors.frequencySecondValue ?
                          validationsHelper.getErrorMessage(planItem.errors.frequencySecondValue.message)
                          : ''
                      }
                    </p>
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
          <div className="bm-cross-button menu-cross-button">
            <span className="cross">
              <span className="bm-cross bm-cross-left">
              </span>
              <span className="bm-cross bm-cross-right">
              </span>
            </span>
            <button onClick={changeModalState}>close</button>
          </div>
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
                  onChange={handleOnChange}
                  value={planItems[selectedPlanItemIndex].data.frequency}
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
            <p className='small italic-proyectos text-danger'>
              {validationsHelper.getErrorMessage(planItems[selectedPlanItemIndex].errors.frequency.message)}
            </p>
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
                  onChange={handleOnChange}
                  value={planItems[selectedPlanItemIndex].data.frequencyType}
                >
                  <option value="">-</option>
                  {
                    planItems[selectedPlanItemIndex].data.frequency &&
                      planItems[selectedPlanItemIndex].data.frequency !== "" &&
                      frequencyTime.find(time => time.value === planItems[selectedPlanItemIndex].data.frequency)?
                      frequencyTime.find(time => time.value === planItems[selectedPlanItemIndex].data.frequency)
                        .types.map((type, index) =>
                        <option value={type.value} key={index}>{type.name}</option>)
                      : ''
                  }
                </select>
              </div>
            </div>
            <p className='small italic-proyectos text-danger'>
              {validationsHelper.getErrorMessage(planItems[selectedPlanItemIndex].errors.frequencyType.message)}
            </p>
          </div>
          {this.getFrequencyThirdOption(planItems[selectedPlanItemIndex], selectedPlanItemIndex)}
        </div>
      </Modal>
    );

  }
}

Reminder.propTypes = {
  selectedPlanItemIndex: PropTypes.number,
  planItems: PropTypes.array,
  handleOnChange: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  changeModalState: PropTypes.func
};

export default Reminder;