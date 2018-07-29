import React from 'react'
import { Meteor } from 'meteor/meteor';
import ChatBot, { ChatBotUtil } from 'i-chatbot'
import Logic from './Logic.js'
import InterviewQuestions from './InterviewQuestions.js'
import { TAPi18n } from 'meteor/tap:i18n';

export default class ExpertChatbot extends React.Component {
	
	constructor(props) {
		super(props);

		Logic.goalsQuestionsAmount = InterviewQuestions.goalQuestions.length;
		Logic.goalsQuestionAnswersAmount = this.goalsQuestionAnswersAmount.bind(this);
		Logic.hasChosenGoalAnswer = this.hasChosenGoalAnswer.bind(this);
		Logic.selectGoalAnswer = this.selectGoalAnswer.bind(this);
		Logic.hasChosenAtLeastOneGoalAnswer = this.hasChosenAtLeastOneGoalAnswer.bind(this);
		Logic.hasToJumpToNextGoalQuestion = this.hasToJumpToNextGoalQuestion.bind(this);

		this.state = {
			hasStartedChat: false,
			goalQuestions: InterviewQuestions.goalQuestions,
			contributionsQuestions: InterviewQuestions.contributionsQuestions,
			identityQuestions: InterviewQuestions.identityQuestions
		};
	}

	goalsQuestionAnswersAmount(questionNumber) {
		return this.state
			.goalQuestions[questionNumber - 1]
			.answersAmount;
	}

	hasChosenAtLeastOneGoalAnswer(questionNumber) {
		return this.state
			.goalQuestions[questionNumber - 1]
			.selectedAnswers
			.legnth > 0;
	}

	hasChosenGoalAnswer(questionNumber, answerNumber) {
		return this.state
			.goalQuestions[questionNumber - 1]
			.selectedAnswers
			.includes(answerNumber);
	}

	hasToJumpToNextGoalQuestion(questionNumber) {
		const goalQuestion = this.state.goalQuestions[questionNumber - 1]; 
		return (goalQuestion.answersAmount == goalQuestion.selectedAnswers.length
			|| !goalQuestion.multipleSelection);
	}

	selectGoalAnswer(questionNumber, answerNumber) {
		let _goalQuestions = this.state.goalQuestions;
		_goalQuestions[questionNumber - 1].selectedAnswers.push(answerNumber);
		this.setState({
			goalQuestions: _goalQuestions
		});
		this.cleanEmptyMessages();
	}

	showChatBot() {
		this.setState({
			hasStartedChat: true
		});
	}

	cleanEmptyMessages() {
		
		const youCanSelectMoreOptionsMessage = TAPi18n.__('interview.youCanSelectMoreOptions');
		const spanSelector = "span:contains('" + youCanSelectMoreOptionsMessage + "')";
		console.log('Span selector is: ' + spanSelector);
		$(spanSelector).parent().parent().parent().hide();
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
						onGetStarted={Logic.getStarted}
						getStartedButton={ChatBotUtil.makeGetStartedButton(TAPi18n.__('interview.getStarted'))}
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