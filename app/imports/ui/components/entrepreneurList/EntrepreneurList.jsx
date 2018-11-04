import React from 'react'
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { selectEntrepreneur } from '../../../../lib/routes/router';

export class EntrepreneurList extends React.Component {

  getUserStatus(userStatus) {
    switch(userStatus) {
      case 'pending':
        return 'Pendiente';
      case 'pendingChatbot':
        return 'Pendiente de Entrevista';
      case 'pendingAreas':
        return 'Pendiente de Ingresar Áreas';
      case 'pendingPlans':
        return 'Pendiente de Ingresar Planes';
      default:
        return 'Aprobado';
    }
  }

	render() {
    const entrepreneurs = this.props.users.filter(user => Roles.userIsInRole(user._id, ['entrepreneur']));
		return (
			<div className="content-body plan">
        <div className="col-md-12">
            <div className="row" style={{alignItems: 'center', marginBottom: '20px'}}>
                <strong><h1 style={{display: 'inline'}}>Listado de Emprendedores</h1></strong>
            </div>
        </div>
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                entrepreneurs.map((entrepreneur, index) => (
                  <tr key={index}>
                    <td>{entrepreneur.personalInformation.name}</td>
                    <td>{entrepreneur.personalInformation.surname}</td>
                    <td>{entrepreneur.emails[0].address}</td>
                    <td>{this.getUserStatus(entrepreneur.personalInformation.status)}</td>
                    <td>{entrepreneur.personalInformation.status === 'approved' ?
                      <button onClick={() => {
                        FlowRouter.go('adminHome', {userId: entrepreneur._id});
                      }}>VER</button> : ''}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
			</div>
		);
	}

}

export default withTracker(() => {
  const userSubs = Meteor.subscribe('getUsersEntrepreneur');
  const loading = !userSubs.ready();
  return {
		users: Meteor.users.find().fetch(),
		loading
  };
})(EntrepreneurList);