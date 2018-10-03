import React from 'react'
import ChatBot, { ChatBotUtil } from './../../../../lib/interview-chatbot/lib/index'
import Logic from './Logic.js'
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import InterviewQuestions from './InterviewQuestions';
import { withTracker } from 'meteor/react-meteor-data';

export class ReviewInterview extends React.Component {

	render() {

    const {goals, contributions, identity_traits, loading} = this.props;
    
    if (loading) {
      return <div />;
    }

    const answers = goals.concat(contributions).concat(identity_traits);

		return (
			<div className="content-body plan">
        <div className="col-md-6">
          <h2>Respuestas de la Entrevista</h2>
          {
            InterviewQuestions.allQuestions.map((question, index) => (
              <div key={index}>
                <li>{TAPi18n.__('interview.' + question.question)}</li>
                {
                  question.possibleAnswers
                    .filter(possibleAnswer => answers.includes(possibleAnswer))
                    .map((possibleAnswer, answerIndex) =>
                      <h6 key={answerIndex}>{TAPi18n.__('interview.' + possibleAnswer)}</h6>
                    )
                }
              </div>
            ))
          }
        </div>
        <div className="row">
          <button className='pink-button' onClick={() => FlowRouter.go('chatbot')}>Volver</button>
        </div>
			</div>
		);
	}

}

export default withTracker(() => {
  const userSubs = Meteor.subscribe('getUserInterviewData');
  const loading = !userSubs.ready();
  return {
		goals: Meteor.user().goals,
		contributions: Meteor.user().contributions,
		identity_traits: Meteor.user().identity_traits,
		loading
  };
})(ReviewInterview);