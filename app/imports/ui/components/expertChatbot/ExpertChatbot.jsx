import React from 'react'
import ChatBot, { ChatBotUtil } from './../../../../lib/interview-chatbot/lib/index'
import Logic from './Logic.js'
import { TAPi18n } from 'meteor/tap:i18n';

export default class ExpertChatbot extends React.Component {
	
	constructor(props) {
		super(props);

		const isPendingChatbot = Meteor.users.findOne().personalInformation.status == 'pendingChatbot';
		const questionNumber = Meteor.users.findOne().personalInformation.currentQuestionNumber;

		console.log('question number ' + questionNumber);

		this.state = {
			hasStartedChat: false,
			hasBeganInterview: questionNumber > 0,
			questionNumber,
			isPendingChatbot
		};
	}

	showChatBot() {
		this.setState({
			hasStartedChat: true
		});
	}

	getChatContent() {

		if (!this.state.isPendingChatbot) {
			return (
				<div className="GetStarted Content content-body">
					<div className="FullSizeTable">
						<div className="AlignMiddle">
							<img src="/img/emprendimientos-logo.png" className='Justin'/>
								<div className="welcome-title">
									<h1><strong>Felicidades por iniciar un emprendimiento</strong></h1>
									<h3><strong>Haz terminado tu entrevista inicial</strong></h3>
								</div>	
						</div>
					</div>
				</div>
			)
		}

		if (!this.state.hasStartedChat) {
			return (
				<div className="GetStarted Content content-body">
					<div className="FullSizeTable">
						<div className="AlignMiddle">
							<img src="/img/emprendimientos-logo.png" className='Justin'/>			
								{this.state.hasBeganInterview ? (
									<div className="welcome-title">
									<h1><strong>Hola! Bienvenido de vuelta</strong></h1>
									<span><button onClick={() => this.showChatBot()}>Quiero continuar mi entrevista</button></span>
									</div>
								) : (
									<div className="welcome-title">
									<h1><strong>Entrevista</strong></h1>
									<p><i>Vamos a tener una entrevista para conocer tus objetivos, los recursos que tenes disponibles y tu identidad, ¡Como sos vos!</i></p>
									<span><button onClick={() => this.showChatBot()}>Comenzar!</button></span>
									</div>
								)}
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="Content">
					
					{this.state.hasBeganInterview ? (
						<ChatBot
							onGetStarted={() => Logic.continueInterview(this.state.questionNumber)}
							getStartedButton={ChatBotUtil.makeGetStartedButton(TAPi18n.__('interview.continueInterview'))}
						/>
					) : (
						<ChatBot
							onGetStarted={Logic.getStarted}
							getStartedButton={ChatBotUtil.makeGetStartedButton(TAPi18n.__('interview.getStarted'))}
						/>
					)}
					
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