import React from 'react'
import { Meteor } from 'meteor/meteor';
import ChatBot, { ChatBotUtil } from 'i-chatbot'
import Logic from './PlanScreenLogic.js'

export default class SuggestionsChatbot extends React.Component {
	
	constructor(props) {
		super(props);

		Logic.goalsQuestionsAmount = InterviewQuestions.goalQuestions.length;
		Logic.goalsQuestionAnswersAmount = this.goalsQuestionAnswersAmount.bind(this);
		Logic.hasChosenGoalAnswer = this.hasChosenGoalAnswer.bind(this);
		Logic.selectGoalAnswer = this.selectGoalAnswer.bind(this);
		Logic.hasChosenAtLeastOneGoalAnswer = this.hasChosenAtLeastOneGoalAnswer.bind(this);
		Logic.hasToJumpToNextGoalQuestion = this.hasToJumpToNextGoalQuestion.bind(this);

		Logic.contributionsQuestionsAmount = InterviewQuestions.contributionsQuestions.length;
		Logic.contributionsQuestionAnswersAmount = this.contributionsQuestionAnswersAmount.bind(this);
		Logic.hasChosenContributionAnswer = this.hasChosenContributionAnswer.bind(this);
		Logic.selectContributionAnswer = this.selectContributionAnswer.bind(this);
		Logic.hasChosenAtLeastOneContributionAnswer = this.hasChosenAtLeastOneContributionAnswer.bind(this);
		Logic.hasToJumpToNextContributionQuestion = this.hasToJumpToNextContributionQuestion.bind(this);

		Logic.identityQuestionsAmount = InterviewQuestions.identityQuestions.length;
		Logic.identityQuestionAnswersAmount = this.identityQuestionAnswersAmount.bind(this);
		Logic.hasChosenIdentityAnswer = this.hasChosenIdentityAnswer.bind(this);
		Logic.selectIdentityAnswer = this.selectIdentityAnswer.bind(this);
		Logic.hasChosenAtLeastOneIdentityAnswer = this.hasChosenAtLeastOneIdentityAnswer.bind(this);
		Logic.hasToJumpToNextIdentityQuestion = this.hasToJumpToNextIdentityQuestion.bind(this);

		this.state = {
			hasStartedChat: false,
			goalQuestions: InterviewQuestions.goalQuestions,
			contributionsQuestions: InterviewQuestions.contributionsQuestions,
			identityQuestions: InterviewQuestions.identityQuestions
		};
	}

	// ---------- Goal questions functions ------------------------
	goalsQuestionAnswersAmount(questionNumber) {
		this.cleanEmptyMessages();
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
	}
	// ---------- Goal questions functions.

	// ---------- Contribution questions functions ------------------------
	contributionsQuestionAnswersAmount(questionNumber) {
		this.cleanEmptyMessages();
		return this.state
			.contributionsQuestions[questionNumber - 1]
			.answersAmount;
	}

	hasChosenAtLeastOneContributionAnswer(questionNumber) {
		return this.state
			.contributionsQuestions[questionNumber - 1]
			.selectedAnswers
			.legnth > 0;
	}

	hasChosenContributionAnswer(questionNumber, answerNumber) {
		return this.state
			.contributionsQuestions[questionNumber - 1]
			.selectedAnswers
			.includes(answerNumber);
	}

	hasToJumpToNextContributionQuestion(questionNumber) {
		const contributionsQuestions = this.state.contributionsQuestions[questionNumber - 1]; 
		return (contributionsQuestions.answersAmount == contributionsQuestions.selectedAnswers.length
			|| !contributionsQuestions.multipleSelection);
	}

	selectContributionAnswer(questionNumber, answerNumber) {
		let _contributionsQuestions = this.state.contributionsQuestions;
		_contributionsQuestions[questionNumber - 1].selectedAnswers.push(answerNumber);
		this.setState({
			contributionsQuestions: _contributionsQuestions
		});
		this.cleanEmptyMessages();
	}
	// ---------- Contribution questions functions.

	// ---------- Identity questions functions ------------------------
	identityQuestionAnswersAmount(questionNumber) {
		this.cleanEmptyMessages();
		return this.state
			.identityQuestions[questionNumber - 1]
			.answersAmount;
	}

	hasChosenAtLeastOneIdentityAnswer(questionNumber) {
		return this.state
			.identityQuestions[questionNumber - 1]
			.selectedAnswers
			.legnth > 0;
	}

	hasChosenIdentityAnswer(questionNumber, answerNumber) {
		return this.state
			.identityQuestions[questionNumber - 1]
			.selectedAnswers
			.includes(answerNumber);
	}

	hasToJumpToNextIdentityQuestion(questionNumber) {
		const identityQuestion = this.state.identityQuestions[questionNumber - 1]; 
		return (identityQuestion.answersAmount == identityQuestion.selectedAnswers.length
			|| !identityQuestion.multipleSelection);
	}

	selectIdentityAnswer(questionNumber, answerNumber) {
		let _identityQuestions = this.state.identityQuestions;
		_identityQuestions[questionNumber - 1].selectedAnswers.push(answerNumber);
		this.setState({
			identityQuestions: _identityQuestions
		});
		this.cleanEmptyMessages();
	}
	// ---------- Identity questions functions.

	showChatBot() {
		this.setState({
			hasStartedChat: true
		});
	}

	cleanEmptyMessages() {
		
		const youCanSelectMoreOptionsMessage = TAPi18n.__('interview.youCanSelectMoreOptions');
		const spanSelector = "span:contains('" + youCanSelectMoreOptionsMessage + "')";
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