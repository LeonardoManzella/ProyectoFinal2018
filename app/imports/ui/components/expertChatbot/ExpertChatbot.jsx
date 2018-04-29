import React from 'react'
import { Meteor } from 'meteor/meteor';
import ChatBot, { ChatBotUtil } from 'i-chatbot'
import Logic from './Logic.js'

export default class ExpertChatbot extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			hasStartedChat: false
		};
	  }
	  
	showChatBot() {
		this.setState({
			hasStartedChat: true
		});
	}

	getChatContent() {

		if (!this.state.hasStartedChat) {
			return (
				<div className="GetStarted Content">
					<div className="FullSizeTable">
						<div className="AlignMiddle">
							<img src="/img/emprendimientos-logo.png" className='Justin'/>
						</div>
						<div className="AlignMiddle">
							<h1>Felicidades por iniciar un emprendimiento</h1>
							<p>Este será el asesor para definir tus objetivos</p>
							<span><button onClick={() => this.showChatBot()}>Comenzar!</button></span>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="Content">
					<ChatBot
						onGetStarted={Logic.getStarted}
						getStartedButton={ChatBotUtil.makeGetStartedButton('Get Started')}
					/>
				</div>
			)
		}

	}

	render() {
		return (

			<div className="Home">
				<div className="Chat Container">
				
					{this.getChatContent()}
					
					<div className="Background"></div>
				</div>	
			</div>
		);
	}

}