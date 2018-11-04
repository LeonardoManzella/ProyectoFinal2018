import React from 'react'
import ChatBot, { ChatBotUtil } from './../../../../lib/interview-chatbot/lib/index'
import Logic from './Logic.js'
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import InterviewQuestions from './InterviewQuestions';
import { withTracker } from 'meteor/react-meteor-data';

export class ExpertChatbot extends React.Component {
	
	constructor(props) {
		super(props);

		const isPendingChatbot = props.user && props.user.personalInformation ?
			props.user.personalInformation.status == 'pendingChatbot' : props.user;
		const questionNumber = props.user && props.user.personalInformation ?
			props.user.personalInformation.currentQuestionNumber : 1;

		console.log('question number ' + questionNumber);

		this.state = {
			hasStartedChat: false,
			hasBeganInterview: questionNumber > 0,
			hasFinishedInterview: questionNumber === InterviewQuestions.allQuestions.length + 1,
			questionNumber,
			isPendingChatbot
		};
	}

	componentWillReceiveProps(props) {
		const isPendingChatbot = props.user ? props.user.personalInformation.status == 'pendingChatbot' : props.user;
		const questionNumber = props.user ? props.user.personalInformation.currentQuestionNumber : 1;

		console.log('question number ' + questionNumber);
		
		this.setState({
			hasBeganInterview: questionNumber > 0,
			hasFinishedInterview: questionNumber === InterviewQuestions.allQuestions.length + 1,
			questionNumber,
			isPendingChatbot
		});
	}

	showChatBot() {
		this.setState({
			hasStartedChat: true
		});
	}

	getMessage() {
		if (this.state.hasFinishedInterview) {
			const redirectName = this.props.userId ? 'adminReviewInterview' : 'reviewInterview';
			const params = this.props.userId ? {userId: this.props.userId} : {};
			return (
				<div className="welcome-title">
				<h1><strong>Felicidades por iniciar un emprendimiento</strong></h1>
				<span><button onClick={() => FlowRouter.go(redirectName, params)}>Revisar Entrevista</button></span>
				</div>
			);
		} else if (this.state.hasBeganInterview) {
			return (
				<div className="welcome-title">
				<h1><strong>Felicidades por iniciar un emprendimiento</strong></h1>
				<span><button onClick={() => this.showChatBot()}>Quiero continuar mi entrevista inicial</button></span>
				</div>
			);
		}
		return (
			<div className="welcome-title">
			<h1><strong>Felicidades por iniciar un emprendimiento</strong></h1>
			<p><i>Este será el asesor para definir tus objetivos</i></p>
			<span><button onClick={() => this.showChatBot()}>Comenzar!</button></span>
			</div>
		);
	}

	getChatContent() {
		if (!this.state.hasStartedChat) {
			return (
				<div className="GetStarted Content content-body">
					<div className="FullSizeTable">
						<div className="AlignMiddle">
							<img src="/img/emprendimientos-logo.png" className='Justin'/>
							{this.getMessage()}
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

export default withTracker((props) => {
	let user = Meteor.user();
	let loading = false;
	if (props.userId) {
		const userSubs = Meteor.subscribe('getUser', props.userId);
		user = Meteor.users.findOne({_id: props.userId}),
		loading = !userSubs.ready();
	}
  return {
		user,
		userId: props.userId,
		loading
  };
})(ExpertChatbot);