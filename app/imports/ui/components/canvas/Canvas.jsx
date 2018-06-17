import React from 'react';
import CanvasCard from './CanvasCard';
import EmptyMessage from '../sharedComponents/EmptyMessage';

const emptyCompetitor = {
  name: '',
  differentiator: ''
};

const emptyBusinessArea = {
  name: '',
  details: '',
  providers: '',
  clients: '',
  agglutinativeClients: '',
  competitors: []
};

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      businessAreas: []
    };
  }

  handleOnChange(event, index, indexCompetitor) {
    const { businessAreas } = this.state;
    const businessArea = businessAreas[index].data;
    if (indexCompetitor || indexCompetitor === 0) {
      businessArea.competitors[indexCompetitor][event.target.name] = event.target.value;
    } else {
      businessArea[event.target.name] = event.target.value;
    }
    businessAreas[index].data = businessArea;
    this.setState({businessAreas});
  }

  addBusinessArea() {
    const { businessAreas } = this.state;
    const data = Object.assign({}, emptyBusinessArea);
    data.competitors = [];
    data.competitors.push(Object.assign({}, emptyCompetitor));
    const newBusinessArea = {
      data,
      editable: true
    };
    businessAreas.push(newBusinessArea);
    this.setState({businessAreas});
  }

  modifyCompetitorsList(index, addCompetitor, indexCompetitor) {
    const { businessAreas } = this.state;
    if (addCompetitor) {
      businessAreas[index].data.competitors.push(Object.assign({}, emptyCompetitor));
    } else {
      businessAreas[index].data.competitors.splice(indexCompetitor, 1);
    }
    this.setState({businessAreas});
  }

  changeEditOptionBusinessArea(index) {
    const { businessAreas } = this.state;
    businessAreas[index].editable = !this.state.businessAreas[index].editable;
    this.setState({businessAreas});
  }

  deleteBusinessArea(index) {
    const { businessAreas } = this.state;
    businessAreas.splice(index, 1);
    this.setState({businessAreas});
  }

	render() {
		return (
			<div className="content-body">
        <div className="row header">
            <div className="col-md-6">
              <h2>ÁREAS DE NEGOCIO</h2>
            </div>
            <div className="col-md-6">
              <button onClick={this.addBusinessArea.bind(this)} className="btn pull-right">
                Agregar Área 
              </button>
            </div>
        </div>
        {
          this.state.businessAreas.map((businessArea, index) =>
            <CanvasCard
              key={index}
              businessAreaData = {businessArea.data}
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

export default Canvas;