import React from 'react'
import { Meteor } from 'meteor/meteor';
import ChatBot, { ChatBotUtil } from 'i-chatbot'
import Logic from './PlanScreenLogic.js'

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
				<div className="GetStarted Content content-body">
					<div className="FullSizeTable">
						<div className="AlignMiddle">
							<img src="/img/emprendimientos-logo.png" className='Justin'/>
						</div>
					</div>
					<div className="FullSizeTable">
						<div className="AlignMiddle welcome-title">
							<h1><strong>Felicidades por iniciar un emprendimiento</strong></h1>
							<p><i>Este será el asesor para definir tus objetivos</i></p>
							<span><button onClick={() => this.showChatBot()}>Comenzar!</button></span>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="Content">
					<ChatBot
						onGetStarted={Logic.getStarted(this.props.current_plan_prop)} //Link to Prop so it updates upon parent update 
						getStartedButton={ChatBotUtil.makeGetStartedButton('Hola!')}
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