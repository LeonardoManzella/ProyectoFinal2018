import React, {ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from './ApiCalendar.js'

export default class Calendar extends React.Component {

		constructor(props) {
			super(props);

            this.apiCalendar = new ApiCalendar();
		}
		
		
		handleItemClick(event, name) {
			if (name === 'sign-in') {
				this.apiCalendar.handleAuthClick();
			  } else if (name === 'sign-out') {
				this.apiCalendar.handleSignoutClick();
			  }
		}

		handleCreateEvent() {
			const eventFromNow = {
				summary: "NOW EVENT!! SUCCES HAPPINESS",
				time: 480,
			};
		   
			this.apiCalendar.createEventFromNow(eventFromNow)
			  .then((result) => {
				console.log(result);
				  })
			   .catch((error) => {
				 console.log(error);
				  });
        }
        
        handleCheckEvents(){
            if (this.apiCalendar.sign)
            this.apiCalendar.listUpcomingEvents(10)
              .then(({result}) => {
                console.log(result.items);
              });
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
								onClick={(e) => this.handleCreateEvent()}
						>
							create-event
						</button>

                        <button
								onClick={(e) => this.handleCheckEvents()}
						>
							check-events
						</button>

				</div>
				);
		}
}