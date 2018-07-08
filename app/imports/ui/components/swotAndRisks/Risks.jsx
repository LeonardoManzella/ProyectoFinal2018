import React from 'react';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import CrudActions from '../sharedComponents/CrudActions';

class Risks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderRisks() {
    const isEditable = true;
    return (
      <div className="swot-tasks">
        <div className="row header">
          <h4>Riesgos</h4>
          <CrudActions
            isEditable={isEditable}
            iconsColor='-gray'
          />
        </div>
        <div className="row header">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Riesgo</th>
                <th scope="col">Probabilidad de ocurrencia</th>
                <th scope="col">Nivel de Impacto</th>
                <th scope="col">Capacidad de Detección</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a className="icon">
                        <img src='/img/add.svg'/>
                      </a>
                    </th>
                    :
                    <th />
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Riesgo"
                    name='risk'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Alta"
                    name='probability'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Alto"
                    name='impact'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Bajo"
                    name='detectionCapacity'
                    disabled={!isEditable}
                  />
                </td>
                {
                  isEditable ?
                    <td>
                      <a className="icon" onClick={() => modifyPlanItemsList(false, index)}>
                        <img src='/img/rubbish-bin-gray.svg'/>
                      </a>
                    </td>
                    :
                    <td />
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderContingencyPlans() {
    const isEditable = true;
    return (
      <div className="swot-tasks">
        <div className="row header">
          <h4>Plan de Contingencia</h4>
          <CrudActions
            isEditable={isEditable}
            iconsColor='-gray'
          />
        </div>
        <div className="row header">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Riesgo</th>
                <th scope="col">Tarea / Herramienta / Objetivo</th>
                <th scope="col">Quién Usa / Hace / Responsable</th>
                <th scope="col">Quién Controla</th>
                <th scope="col">Frecuencia / Plazo</th>
                {
                  isEditable ?
                    <th scope="col">
                      <a className="icon">
                        <img src='/img/add.svg'/>
                      </a>
                    </th>
                    :
                    <th />
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Riesgo"
                    name='element'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Acción"
                    name='tool'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Moi"
                    name='responsible'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Nicole"
                    name='supervisor'
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    placeholder="Ej: Cada 2 días"
                    name='frequency'
                    disabled={!isEditable}
                  />
                </td>
                {
                  isEditable ?
                    <td>
                      <a className="icon" onClick={() => modifyPlanItemsList(false, index)}>
                        <img src='/img/rubbish-bin-gray.svg'/>
                      </a>
                    </td>
                    :
                    <td />
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

	render() {
		return (
			<div className="content-body">
        <div className="row header">
            <div className="col-md-6">
              <h2>RIESGOS</h2>
            </div>
        </div>
        {this.renderRisks()}
        {this.renderContingencyPlans()}
			</div>
		);
			
	}
}

export default Risks;