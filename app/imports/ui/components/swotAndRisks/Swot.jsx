import React from 'react';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import CrudActions from '../sharedComponents/CrudActions';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

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

  addSwotButton(swotElement) {
    return (
      <Dropdown isOpen={this.state.dropdownsOpen[swotElement]}
        toggle={() => this.toggle(swotElement)}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownsOpen[swotElement]}
        >
          <a className="icon">
            <img src="/img/add.svg" />
          </a>
        </DropdownToggle>
        <DropdownMenu>
          <div>
            <input
              className='dropdown-input'
              placeholder="Ej: Perseverante"
              onChange={(e) => this.setState({swotInput: e.target.value})}/>
          </div>
          <div className="dropdown-row">
            <button onClick={() => this.addSwotElement(swotElement)}>Agregar</button>
            <button onClick={() => this.toggle(swotElement)}>Cancelar</button>
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }

  renderSwotElement(swotElement, classname) {
    return (
      <div className={"col-md-5 section " + classname}>
        {
          this.state.swot[swotElement].map((element, index) => (
            <div key={index} className="row swot-element">
              <p key={index}>{element}</p>
              <a className="icon" onClick={() => this.removeSwotElement(swotElement, index)}>
                <img src="/img/rubbish-bin-gray.svg" />
              </a>
            </div>
          ))
        }
        <div className="actions">
          {this.addSwotButton(swotElement)}
        </div>
      </div>
    );
  }

  renderSwot() {
    return (
      <div className="swot">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-5">
            <h4> POSITIVO </h4>
          </div>
          <div className="col-md-5">
            <h4> NEGATIVO </h4>
          </div>
        </div>
        <div className="row row-data">
          <div className="col-md-2">
            <h4> INTERNO </h4>
          </div>
          {this.renderSwotElement('strengths', 'strength')}
          {this.renderSwotElement('weaknesses', 'weakness')}
        </div>
        <div className="row row-data">
          <div className="col-md-2">
            <h4> EXTERNO </h4>
          </div>
          {this.renderSwotElement('opportunities', 'opportunity')}
          {this.renderSwotElement('threats', 'threat')}
        </div>
      </div>
    );
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

  renderSwotTasksRow(swotTask, swotTaskIndex) {
    const isEditable = true;
    return (
      <tr key={swotTaskIndex}>
        <td>
          <select
            placeholder="Perseverante"
            name='element'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, swotTaskIndex)}
            value={swotTask.element}
          >
            {
              Object.values(this.state.swot).map((swotElement) => (
                swotElement.map((element, index) => (
                  <option key={index}>{element}</option>
                ))
              ))
            }
          </select>
        </td>
        <td>
          <input
            placeholder="Ej: Seguir así"
            name='tool'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, swotTaskIndex)}
            value={swotTask.tool}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Moi"
            name='responsible'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, swotTaskIndex)}
            value={swotTask.responsible}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Nicole"
            name='supervisor'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, swotTaskIndex)}
            value={swotTask.supervisor}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Cada 2 días"
            name='frequency'
            disabled={!isEditable}
            onChange={(event) => this.handleOnChange(event, swotTaskIndex)}
            value={swotTask.frequency}
          />
        </td>
        {
          isEditable ?
            <td>
              <a className="icon" onClick={() => this.modifySwotTasks(false, swotTaskIndex)}>
                <img src='/img/rubbish-bin-gray.svg'/>
              </a>
            </td>
            :
            <td />
        }
      </tr>
    );
  }

  renderSwotTasks() {
    const isEditable = true;
    return (
      <div className="swot-tasks">
        <div className="row header">
          <h4>Tareas Foda</h4>
        </div>
        <div className="row header">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Elemento</th>
                <th scope="col">Tarea / Herramienta / Objetivo</th>
                <th scope="col">Quién Usa / Hace / Responsable</th>
                <th scope="col">Quién Controla</th>
                <th scope="col">Frecuencia / Plazo</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a className="icon" onClick={() => this.modifySwotTasks(true)}>
                        <img src='/img/add.svg'/>
                      </a>
                    </th>
                    :
                    <th />
                }
              </tr>
            </thead>
            <tbody>
              {
                this.state.swotTasks.map((swotTask, swotTaskIndex) =>
                  this.renderSwotTasksRow(swotTask, swotTaskIndex))
              }
            </tbody>
          </table>
          { this.state.swotTasks.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
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
        {this.renderSwot()}
        {this.renderSwotTasks()}
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