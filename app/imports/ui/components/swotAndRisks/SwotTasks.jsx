import React from 'react';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import PropTypes from 'prop-types';

class SwotTasks extends React.Component {

  renderSwotTasksRow(swotTask, swotTaskIndex) {
    const isEditable = true;
    const {handleOnChange, modifySwotTasks} = this.props;
    return (
      <tr key={swotTaskIndex}>
        <td>
          <select
            name='element'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.element}
          >
            <option>Seleccionar elemento</option>
            {
              Object.values(this.props.swot).map((swotElement) => (
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
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.tool}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Moi"
            name='responsible'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.responsible}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Nicole"
            name='supervisor'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.supervisor}
          />
        </td>
        <td>
          <input
            placeholder="Ej: Cada 2 días"
            name='frequency'
            disabled={!isEditable}
            onChange={(event) => handleOnChange(event, swotTaskIndex)}
            value={swotTask.frequency}
          />
        </td>
        {
          isEditable ?
            <td>
              <a className="icon" onClick={() => modifySwotTasks(false, swotTaskIndex)}>
                <img src='/img/rubbish-bin-gray.svg'/>
              </a>
            </td>
            :
            <td />
        }
      </tr>
    );
  }

  render() {
    const isEditable = true;
    const {modifySwotTasks} = this.props;
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
                      <a className="icon" onClick={() => modifySwotTasks(true)}>
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
                this.props.swotTasks.map((swotTask, swotTaskIndex) =>
                  this.renderSwotTasksRow(swotTask, swotTaskIndex))
              }
            </tbody>
          </table>
          { this.props.swotTasks.length === 0 ? <EmptyMessage/> : '' }
        </div>
      </div>
    );
  }
}

SwotTasks.propTypes = {
  swot: PropTypes.object,
  swotTasks: PropTypes.array,
  handleOnChange: PropTypes.func,
  modifySwotTasks: PropTypes.func
};

export default SwotTasks;