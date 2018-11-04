import React from 'react';
import CanvasCard from './CanvasCard';
import EmptyMessage from '../sharedComponents/EmptyMessage';
import PropTypes from 'prop-types';
import { validationsHelper } from '../../../api/helpers/validationsHelper';

const emptyCompetitor = {
  name: '',
  differentiator: ''
};

const emptyBusinessArea = {
  name: '',
  details: '',
  providers: '',
  clients: '',
  agglutinators: '',
  competitors: []
};

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      businessAreas: props.businessAreas ?
        props.businessAreas.map(businessArea => ({
          data: businessArea,
          editable: false,
          errors: validationsHelper.initializeBusinessAreasErrors()
        })) : [],
      generalError: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({businessAreas:
      nextProps.businessAreas.map(businessArea => ({
        data: businessArea,
        editable: false,
        errors: validationsHelper.initializeBusinessAreasErrors(),
      })),
      generalError: ''
    });
  }

  handleOnChange(event, index, indexCompetitor) {
    const { businessAreas } = this.state;
    const businessArea = businessAreas[index];
    if (indexCompetitor || indexCompetitor === 0) {
      businessArea.data.competitors[indexCompetitor][event.target.name] = event.target.value;
    } else {
      businessArea.data[event.target.name] = event.target.value;
      businessArea.errors[event.target.name].message = '';
    }
    businessAreas[index] = businessArea;
    this.setState({businessAreas, generalError: ''});
  }

  addBusinessArea() {
    const { businessAreas } = this.state;
    const data = Object.assign({}, emptyBusinessArea);
    data.competitors = [];
    data.competitors.push(Object.assign({}, emptyCompetitor));
    const newBusinessArea = {
      data,
      editable: true,
      errors: validationsHelper.initializeBusinessAreasErrors()
    };
    businessAreas.push(newBusinessArea);
    this.setState({businessAreas, generalError: ''});
  }

  modifyCompetitorsList(index, addCompetitor, indexCompetitor) {
    const { businessAreas } = this.state;
    if (addCompetitor) {
      businessAreas[index].data.competitors.push(Object.assign({}, emptyCompetitor));
    } else {
      businessAreas[index].data.competitors.splice(indexCompetitor, 1);
    }
    this.setState({businessAreas, generalError: ''});
  }

  changeEditOptionBusinessArea(index) {
    const { businessAreas } = this.state;
    businessAreas[index].editable = !this.state.businessAreas[index].editable;
    this.setState({businessAreas, generalError: ''});
  }

  deleteBusinessArea(index) {
    const { businessAreas } = this.state;
    businessAreas.splice(index, 1);
    this.setState({businessAreas, generalError: ''});
  }

  saveBusinessAreas() {
    const { businessAreas } = this.state;
    let areasHaveErrors = false;
    businessAreas.forEach(area => {
      const { hasErrors, newErrors } = validationsHelper.getProjectErrors(area.data, area.errors);
      areasHaveErrors = hasErrors ? hasErrors : areasHaveErrors;
      area.errors = newErrors;
    });
    if (areasHaveErrors) {
      this.setState({
        businessAreas,
        generalError: 'Error al guardar cambios. Verifique los datos ingresados.'
      });
      return;
    }
    const businessAreasData = businessAreas.map(businessArea => businessArea.data);
    Meteor.call('insertBusinessAreas', businessAreasData, (error) => {
      if (error) {
        console.log(error);
        this.setState({generalError: 'Error del servidor.'});
        return;
      }
      if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
        Meteor.user() && Meteor.user().personalInformation.status === 'pendingPlans') {
        FlowRouter.go('planList');
      }
    });
  }

  checkEntrepreneurStatus() {
    return (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
      Meteor.user() && Meteor.user().personalInformation.status === 'pendingAreas');
  }

	render() {
    if (this.props.loading) {
      return <div />;
    }
		return (
			<div className="content-body">
        <p className='italic-proyectos text-danger'> {this.state.generalError} </p>
        <div className="row header">
            <div className="col-md-6">
              <h2>Áreas de Negocio</h2>
            </div>
            { !Roles.userIsInRole(Meteor.userId(), ['administrator']) ? (
              <div className="col-md-6">
                <button onClick={this.saveBusinessAreas.bind(this)}>
                  {this.checkEntrepreneurStatus() ? 'Guardar Cambios y Avanzar' : 'Guardar Cambios'}
                </button>
                <button onClick={this.addBusinessArea.bind(this)} className="btn pull-right">
                  Agregar Área 
                </button>
              </div>
              ) : <div className="col-md-6" />
            }
        </div>
        {
          this.state.businessAreas.map((businessArea, index) =>
            <CanvasCard
              key={index}
              businessAreaData = {businessArea.data}
              businessAreaErrors = {businessArea.errors}
              isEditable = {businessArea.editable}
              changeEditOptionBusinessArea = {() => this.changeEditOptionBusinessArea(index)}
              deleteBusinessArea = {() => this.deleteBusinessArea(index)}
              handleOnChange = {(event, indexCompetitor) =>
                this.handleOnChange(event, index, indexCompetitor)}
              modifyCompetitorsList = {(addCompetitor, indexCompetitor) =>
                this.modifyCompetitorsList(index, addCompetitor, indexCompetitor)}
            />
          )
        }
        { this.state.businessAreas.length === 0 ? <EmptyMessage /> : '' }
			</div>
		);
			
	}
}

Canvas.propTypes = {
  loading: PropTypes.bool,
  businessAreas: PropTypes.array
};

export default Canvas;