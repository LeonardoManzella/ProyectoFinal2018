import React from 'react';
import PropTypes from 'prop-types';

class PlanList extends React.Component {

	render() {
    const isEditable = true;
    return (
      <div>
        <div className="row header">
          <div className="col-md-6">
            <h2>PLANES DE COMUNICACIÓN</h2>
          </div>
          <div className="col-md-6">
            <button>
              Agregar Plan
            </button>
            <select>
              <option>Elegir Área</option>
              <option>Todas</option>
              <option>Galería de Arte</option>
            </select>
          </div>
        </div>
        <div className="row header">
          <h5>Galería de Arte</h5>
          <table className="table table-striped">
            <thead>
              <tr>
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
                    placeholder="Ej: Publicación en Facebook"
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
                      <a className="icon">
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
}

PlanList.propTypes = {
};

export default PlanList;