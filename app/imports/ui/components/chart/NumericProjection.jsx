import React from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const calculateLinearRegression = (realValues) => {
	/**
	 * Linear regression in Javascript
	 * (c) 2016, Antonio Villamarin
	 * License GPL
	 */

	var
		xarray = realValues.map(value => value.x),
		yarray = realValues.map(value => value.y),
		x = y = xy = xx = a = b = resultado = 0,
	cantidad = xarray.length,
	futuro = 100;

	for (i = 0; i < cantidad; i++) {
		x += xarray[i];
		y += yarray[i];
		xy += xarray[i]*yarray[i];
		xx += xarray[i]*xarray[i];
	}

	b = ((cantidad * xy) - (x * y)) / ((cantidad * xx) - (x * x));

	a = (y - (b * x)) / cantidad;

	const getLinearRegression = x => Math.round(a + (b * x));

	return xarray.map(xValue => ({
		x: xValue,
		y: getLinearRegression(xValue)
	}));
};


export default class NumericProjection extends React.Component {

	constructor(props) {
		super(props);
		const data = props.numericProjection;
		this.state = {
			initialCapital: data && data.initialCapital ? data.initialCapital : '',
			periodicity: data && data.periodicity ? data.periodicity : 'monthly',
			amount: data && data.amount ? data.amount : '',
			incomes: data && data.incomes ?
				data.incomes.map(income => {
					const newIncome = Object.assign({}, income);
					newIncome.error = '';
					return newIncome;
				}) : [],
			costs: data && data.costs ?
				data.costs.map(cost => {
					const newCost = Object.assign({}, cost);
					newCost.error = '';
					return newCost;
				}) : [],
			errors: {
				initialCapital: '',
				amount: ''
			},
			calculateLinearRegression: false
		}
	}

	componentWillReceiveProps(props) {
		const data = props.numericProjection;
		this.setState({
			initialCapital: data && data.initialCapital ? data.initialCapital : '',
			periodicity: data && data.periodicity ? data.periodicity : 'monthly',
			amount: data && data.amount ? data.amount : '',
			incomes: data && data.incomes ?
				data.incomes.map(income => {
					const newIncome = Object.assign({}, income);
					newIncome.error = '';
					return newIncome;
				}) : [],
			costs: data && data.costs ?
				data.costs.map(cost => {
					const newCost = Object.assign({}, cost);
					newCost.error = '';
					return newCost;
				}) : [],
			errors: {
				initialCapital: '',
				amount: ''
			},
			calculateLinearRegression: false
		});
	}

	handleNumericInputChange(event) {
		const { errors } = this.state;
		let { incomes, costs } = this.state;
		if (event.target.value !== '' && !parseInt(event.target.value)) {
			errors[event.target.name] = 'Debe ser un valor númerico entero';
			this.setState({ errors, calculateLinearRegression: false });
			return;
		}
		errors[event.target.name] = '';
		if (event.target.name === 'amount') {
			incomes = [];
			costs = [];
			const amount = parseInt(event.target.value);
			for (let i = 0; i < amount; i++) {
				incomes.push({ date: i, value: 0, error: '' });
				costs.push({ date: i, value: 0, error: '' });
			}
		}
		this.setState({
			[event.target.name]: event.target.value !== '' ? parseInt(event.target.value) : '',
			errors,
			incomes,
			costs,
			calculateLinearRegression: false
		})
	}

	handleNumericTableInputChange(event, row, index) {
		const rowValues = this.state[row];
		if (event.target.value !== '' && !parseInt(event.target.value)) {
			rowValues[index].error = 'Debe ser un valor númerico entero';
			this.setState({ [row]: rowValues, calculateLinearRegression: false });
			return;
		}
		rowValues[index].value = event.target.value !== '' ? parseInt(event.target.value) : '';
		rowValues[index].error = '';
		this.setState({ [row]: rowValues, calculateLinearRegression: false });
	}

	renderTableRow(rowName, columns, row) {
		rowInputClass = rowName === 'Costos' ? "bordered-cell" : "";
		return (
			<tr>
				<td>{rowName}</td>
				{
					columns.map((columnName, index) =>
						<td key={index}>
							<input
								value={this.state[row][index].value}
								className={rowInputClass}
								onChange={(e) => this.handleNumericTableInputChange(e, row, index)}
								disabled={Roles.userIsInRole(Meteor.userId(), ['administrator'])}
							/>
							<p className='small italic-proyectos text-danger'>
								{this.state[row][index].error}
							</p>
						</td> 
					)
				}
			</tr>
		);
	}

	getColumns() {
		const columns = [];
		const name = this.state.periodicity === 'monthly' ? 'Mes' : 'Año';
		for (let i = 1; i <= this.state.amount; i++) {
			columns.push(name + ' ' + i);
		}
		return columns;
	}

	renderTable() {
		if (this.state.periodicity === '' || this.state.amount === '') {
			return <div />;
		}
		const columns = this.getColumns();
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th />
						{
							columns.map((columnName, index) =>
								<th key={index}>{columnName}</th> 
							)
						}
					</tr>
				</thead>
				<tbody>
					{this.renderTableRow('Ingresos', columns, 'incomes')}
					{this.renderTableRow('Costos', columns, 'costs')}
				</tbody>
			</table>
		);
	}

	renderChart() {
		if (this.state.periodicity === '' || this.state.amount === '') {
			return <div />;
		}
		const columns = this.getColumns();
		const incomes = columns.map((column, index) => ({
				x: index,
				y: this.state.incomes[index].value
			}
		));
		const costs = columns.map((column, index) => ({
				x: index,
				y: this.state.costs[index].value,
			}
		));
		if (this.state.calculateLinearRegression) {
			const incomesLinearRegression = calculateLinearRegression(incomes);
			const costsLinearRegression = calculateLinearRegression(costs);

			return (
				<ScatterChart
					width={1000}
					height={400}
					margin={{ top: 5, right: 10, left: 100, bottom: 5 }}
				>
					<XAxis type = "number" dataKey="x" name="Fecha" unit="" />
					 <YAxis dataKey="y" name="Cantidad" unit="" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Legend/>
					<Scatter name="Ingresos" data={incomes} fill="#82ca9d" />
					<Scatter name="Costos" data={costs} fill="#8884d8" />
					<Scatter name="Proyección de Ingresos" data={incomesLinearRegression} fill="#82ca9d" line />
					<Scatter name="Proyección de Costos" data={costsLinearRegression} fill="#8884d8" line />
				</ScatterChart>
			);
		}
		return (
			<ScatterChart
				width={1000}
				height={400}
				margin={{ top: 5, right: 10, left: 100, bottom: 5 }}
			>
				<XAxis type = "number" dataKey="x" name="Fecha" unit="" />
 				<YAxis dataKey="y" name="Cantidad" unit="" />
				<Tooltip />
				<CartesianGrid stroke="#f5f5f5" />
				<Legend/>
				<Scatter name="Ingresos" data={incomes} fill="#82ca9d" />
				<Scatter name="Costos" data={costs} fill="#8884d8" />
			</ScatterChart>
		);
	}

	saveNumericProjection() {
		const { initialCapital, periodicity, amount, incomes, costs } = this.state;
		Meteor.call('insertNumericProjection', {
			initialCapital,
			periodicity,
			amount,
			incomes: incomes.map(income => ({date: income.date, value: income.value})),
			costs: costs.map(cost => ({date: cost.date, value: cost.value})),
		});
	}

	render() {

		if (this.props.loading) {
			return <div> Loading ... </div>;
		}

		return (
			<div className="content-body chart">
        <div className="row header">
            <div className="col-md-6">
              <h2>Proyección numérica</h2>
            </div>
            <div className="col-md-6">
							{ !Roles.userIsInRole(Meteor.userId(), ['administrator']) ?
									<button onClick={this.saveNumericProjection.bind(this)}>
										Guardar Cambios
									</button>
									: <div />
							}
            </div>
        </div>
				<div className="row header">
					<label> Capital Inicial: $</label>
					<div className="numeric-input">
						<input
							className="dropdown-input"
							name='initialCapital'
							value={this.state.initialCapital}
							onChange={this.handleNumericInputChange.bind(this)}
							disabled={Roles.userIsInRole(Meteor.userId(), ['administrator'])}
						/>
						<p className='small italic-proyectos text-danger'>{this.state.errors.initialCapital}</p>
					</div>
				</div>
				<div className="row header">
					<label> Periodicidad: </label>
					<select
						name='periodicity'
						value={this.state.periodicity}
						onChange={(e) => this.setState({periodicity: e.target.value, calculateLinearRegression: false})}
						disabled={Roles.userIsInRole(Meteor.userId(), ['administrator'])}
					>
						<option value="monthly">Mensual</option>
						<option value="yearly">Anual</option>
					</select>
					<label> Cantidad: </label>
					<div className="numeric-input">
						<input
							type="number"
							min="1"
							max="20"
							className="dropdown-input"
							name='amount'
							value={this.state.amount}
							onChange={this.handleNumericInputChange.bind(this)}
							onKeyPress={(e) => e.preventDefault()}
							disabled={Roles.userIsInRole(Meteor.userId(), ['administrator'])}
						/>
						<p className='small italic-proyectos text-danger'>{this.state.errors.amount}</p>
					</div>
				</div>
				<div className="row header">
          {this.renderTable()}
          {/* this.props.risks.length === 0 ? <EmptyMessage/> : '' */}
        </div>
				<div className="row header">
					<button onClick={() => this.setState({calculateLinearRegression: true})}>
						Calcular Proyección
					</button>
				</div>
				{this.renderChart()}
			</div>
		)
	}
}