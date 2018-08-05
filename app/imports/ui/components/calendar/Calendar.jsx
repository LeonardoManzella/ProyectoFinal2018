import React, {ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from './ApiCalendar.js'
import RRuleGenerator from 'react-rrule-generator';

export default class Calendar extends React.Component {

		constructor(props) {
			super(props);

            this.state = {
                singleEvent : {
                    summary: undefined,
                    description: undefined,
                    date: undefined
                },
                recurringEvent : {
                    summary: undefined,
                    description: undefined,
                    startDate: undefined
                },
                rrule: undefined,
                nextEvents: []
            };

            this.handleSingleEventInputChange = this.handleSingleEventInputChange.bind(this);
            this.handleRecurringEventInputChange = this.handleRecurringEventInputChange.bind(this);
            
            this.apiCalendar = new ApiCalendar();
		}
        
        
		
		handleItemClick(event, name) {
			if (name === 'sign-in') {
				this.apiCalendar.handleAuthClick();
			  } else if (name === 'sign-out') {
				this.apiCalendar.handleSignoutClick();
			  }
		}

		handleCreateSingleAllDayEvent() {

            const event = {
                summary: this.state.singleEvent.summary,
                description : this.state.singleEvent.description,
                start: {
                    date: this.state.singleEvent.date
                },
                end: {
                    date: this.state.singleEvent.date
                }
            };

			this.apiCalendar.createEvent(event)
			  .then((result) => {
				console.log(result);
				  })
			   .catch((error) => {
				 console.log(error);
				  });
        }
        
        handleCreateRecurringAllDayEvent() {

            const event = {
                summary: this.state.recurringEvent.summary,
                description : this.state.recurringEvent.description,
                start: {
                    date: this.state.recurringEvent.startDate
                },
                end: {
                    date: this.state.recurringEvent.startDate
                },
                recurrence: [
                    'RRULE:' + this.state.rrule,
                ]
            };

			this.apiCalendar.createEvent(event)
			  .then((result) => {
				console.log(result);
				  })
			   .catch((error) => {
				 console.log(error);
				  });
        }

        handleCheckEvents(){
            const self = this;
            if (this.apiCalendar.sign)
            this.apiCalendar.listUpcomingEvents(10)
              .then(({result}) => {
                console.log(result.items);
                self.setState({
                    nextEvents: result.items
                });
              });
        }

        handleSingleEventInputChange(event) {
            const targetName = event.target.name;
            const targetValue = event.target.value;
        
            let singleEvent = this.state.singleEvent;
            singleEvent[targetName] = targetValue;
            this.setState(
                {
                    singleEvent
                }
            );
        }

        handleRecurringEventInputChange(event) {
            const targetName = event.target.name;
            const targetValue = event.target.value;
        
            let recurringEvent = this.state.recurringEvent;
            recurringEvent[targetName] = targetValue;
            this.setState(
                {
                    recurringEvent
                }
            );
        }

        renderEvents(events) {
            return (
                events.map((event) => (
                <div className="form-group">
                    <p><strong>{event.summary}</strong></p>
                    <p><i>{event.description}</i></p>
                    <p>{event.start.date}</p>
                </div>
            ))
            ); 
        }

		render() {
			return (
				<div>
                    <button
                            onClick={(e) => this.handleItemClick(e, 'sign-in')}
                    >
                        sign-in
                    </button>
                    <button
                            onClick={(e) => this.handleItemClick(e, 'sign-out')}
                    >
                        sign-out
                    </button>

                    <button
                            onClick={(e) => this.handleCheckEvents()}
                    >
                        check-events
                    </button>

                     <div className="container content-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="title-form">Tus eventos más cercanos son</p>
                                {
                                    this.renderEvents(this.state.nextEvents)
                                }
                            </div>
                        </div>
                    </div>

                    <div className="container content-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="title-form">Evento de todo el día</p>
                                <div className="form-group">
                                    <input onChange={this.handleSingleEventInputChange} type="text" name="summary" className="form-control" placeholder='Título del evento'/>
                                </div>
                                
                                <div className="form-group">
                                    <input onChange={this.handleSingleEventInputChange} type="text" name="description" className="form-control" placeholder='Descripción de evento'/>
                                </div>

                                <div className="form-group">
                                    <input onChange={this.handleSingleEventInputChange} type="date" name="date" className="form-control"/>
                                </div>

                                <div className="margin-top-30">
                                    <button onClick={(e) => this.handleCreateSingleAllDayEvent()} className="btn btn-primary centrado">Crear evento</button>
                                </div>

                            </div>
                        </div>
                    </div>
                        
                    <div className="container content-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="title-form">Creación de evento recurrente</p>
                                <div className="form-group">
                                    <input onChange={this.handleRecurringEventInputChange} type="text" name="summary" className="form-control" placeholder='Título del evento'/>
                                </div>
                                
                                <div className="form-group">
                                    <input onChange={this.handleRecurringEventInputChange} type="text" name="description" className="form-control" placeholder='Descripción de evento'/>
                                </div>

                                <div className="form-group">
                                    <p>Fecha de inicio del evento recurrente</p>
                                    <p>Si se elige día de la semana a repetir, se va a empezar a repetir en ese día, si no, se va a repetir los mismos días que la fecha inicial </p>
                                    <input onChange={this.handleRecurringEventInputChange} type="date" name="startDate" className="form-control"/>
                                </div>

                                <RRuleGenerator
                                    onChange={(rrule) => this.setState({ rrule })}
                                    value={this.state.rrule}
                                />

                                <div className="margin-top-30">
                                    <button onClick={(e) => this.handleCreateRecurringAllDayEvent()} className="btn btn-primary centrado">Crear evento</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    

				</div>
				);
		}
}