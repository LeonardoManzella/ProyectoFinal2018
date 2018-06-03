import React from 'react';

class Canvas extends React.Component {

	render() {
		return (
			<div className="content-body">
        <div className="row header">
          <div className="col-md-12">
            <button className="btn pull-right"> Agregar Área </button>
          </div>
        </div>
        <div className="canvas-card col-md-12">
          <div className="row">
            <h2 className="title"><input placeholder="ÁREA DE NEGOCIO" /></h2>
          </div>
          <div className="row">
            <div className="col-md-3">
              <textarea placeholder="Detalles"/>
            </div>
            <div className="col-md-3">
              <textarea placeholder="Proveedores"/>
            </div>
            <div className="col-md-6">
              <div className="table-container">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Competidor</th>
                      <th scope="col">Diferenciador</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input placeholder="competidor" /></td>
                      <td><input placeholder="diferenciador" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <textarea placeholder="Clientes"/>
            </div>
            <div className="col-md-6">
              <textarea placeholder="Clientes Aglutinadores"/>
            </div>
          </div>
        </div>
			</div>
		);
			
	}
}

export default Canvas;