import React, { Component } from 'react';

export default class Reminders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: []
    };
  }

  saveReminders() {

  }

  render() {
    if (this.props.loading) {
      return <div />;
    }
    return (
      <div className="content-body margin-top-30">
        <div className="row header">
          <div className="col-md-6">
            <h2>Recordatorios</h2>
          </div>
          <div className="col-md-6">
            <button onClick={this.saveReminders.bind(this)}>
              Guardar Cambios
            </button>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control"
            placeholder="Buscar por nombre o emprendimiento"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary search-button" type="button">Buscar</button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Emprendimiento</th>
              <th scope="col">Frecuencia</th>
              <th scope="col">Estado</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.users.map((user, index) =>
                <tr key="index">
                  <td>{user.personalInformation.name + ' ' + user.personalInformation.surname}</td>
                  <td>Emprendimiento</td>
                  <td>
                    <select className="custom-select" defaultValue="">
                      <option value="" disabled hidden>Open this select menu</option>
                      <option value="1">Cada 2 semanas</option>
                      <option value="2">Cada 1 mes</option>
                      <option value="3">Cada 1 año</option>
                    </select>
                  </td>
                  <td><span className="label label-default">Desactivado</span></td>
                  <td>
                    <button className="btn btn-outline-secondary search-button" type="button">Activar Recordatorio</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}