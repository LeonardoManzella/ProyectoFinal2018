import React from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tooltip, Line } from 'britecharts-react';

export default class Chart extends React.Component {

	render() {
		
		const lineData = {
			dataByTopic: [
				{
					topicName: 'Ventas de droga',
					topic: 1,
					dates: [
						{
							date: '2017-01-16T16:00:00-08:00',
							value: 15
						},
						{
							date: '2017-01-17T17:00:00-08:00',
							value: 25
						},
						{
							date: '2017-01-18T17:00:00-08:00',
							value: 11
						},
						{
							date: '2017-01-19T17:00:00-08:00',
							value: 16
						},
						{
							date: '2017-01-20T17:00:00-08:00',
							value: 14
						}
					]
				},
				{
					topicName: 'Ingresos por ventas legales',
					topic: 2,
					dates: [
						{
							date: '2017-01-16T16:00:00-08:00',
							value: 6
						},
						{
							date: '2017-01-17T17:00:00-08:00',
							value: 7
						},
						{
							date: '2017-01-18T17:00:00-08:00',
							value: 14
						},
						{
							date: '2017-01-19T17:00:00-08:00',
							value: 8
						},
						{
							date: '2017-01-20T17:00:00-08:00',
							value: 4
						}
					]
				},
				{
					topicName: 'Egresos necesarios',
					topic: 3,
					dates: [
						{
							date: '2017-01-16T16:00:00-08:00',
							value: 12
						},
						{
							date: '2017-01-17T17:00:00-08:00',
							value: 21
						},
						{
							date: '2017-01-18T17:00:00-08:00',
							value: 16
						},
						{
							date: '2017-01-19T17:00:00-08:00',
							value: 9
						},
						{
							date: '2017-01-20T17:00:00-08:00',
							value: 12
						}
					]
				}
			]
		}

		const margin = {
			top: 60,
			right: 30,
			bottom: 100,
			left: 200,
		};
	
		const renderLine = (props) => (
			<Line
				margin={margin}
				aspectRatio={3} //This does not seem to do a thing...
				{...props}
				grid={'full'}
				isAnimated={true}
				shouldShowAllDataPoints={true}
			/>
		);

		return (
			<div className="content-body">
				<Tooltip
					data={lineData}
					render={renderLine}
					topicLabel={"topics"}
					title={"Tooltip Title"}
					shouldShowDateInTitle={true}
				/>
			</div>
		)
	}
}