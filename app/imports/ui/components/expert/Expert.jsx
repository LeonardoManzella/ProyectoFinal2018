import React from 'react'
import { Meteor } from 'meteor/meteor';

export default class Expert extends React.Component {
	
	constructor(props) {
    super(props);

    this.state = {
      results: []
    };

  }

	handleSubmit(event) {
    event.preventDefault();
		
		console.log('calling consult');

		const self = this;
		Meteor.call('expert.consult', (error, response) => {
      if (error) {
        console.log(error);
      } else {
				self.setState({
					results: response
				});
			}
		});
		
  }

	getResultsListElements(results){
		return results.map(result => <li>{result}</li>);
	}

	getResults(){
		if (this.state.results.length == 0){
			return (
				<div className="tasks container">
					<header className="tasks-header">
						<h1>No hay resultados para mostrar</h1>
					</header>
				</div>
			)
		}

		return(
			<div className="tasks container">
				<header className="tasks-header">
					<h1>Resultados</h1>
				</header>

				<ul>
					{this.getResultsListElements(this.state.results)}
				</ul>

			</div>
		)
	}

	render() {
    return (

			<div>

				<div className="tasks container">
					<header className="tasks-header">
						<h1>Sistema experto</h1>
					</header>

					<form>
						<button onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info">Consulta quién paga IVA</button>
					</form>

				</div>

				{this.getResults()}

			</div>
    );
	}

}