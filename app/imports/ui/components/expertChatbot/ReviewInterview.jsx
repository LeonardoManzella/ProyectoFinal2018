import React from 'react'
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
        <div className="col-md-12">
            <div className="row" style={{alignItems: 'center', marginBottom: '20px'}}>
                <strong><h1 style={{display: 'inline'}}>Revisión de Entrevista</h1></strong>
                <img style={{height: '50px', marginLeft: '20px'}} src='/img/check.png' />
            </div>
            {
            InterviewQuestions.allQuestions.map((question, index) => {
              if(question.question == 'perpetual_identity') return '';
              
              if(question.question == 'what_words_1') {
                return (<div key={index}>
                    <button className='reviewInterviewQuestion'>¿Con qué palabras te identificás?</button>
                    <div className='reviewInterviewAnswers'>
                    <i><h4>Respondiste: </h4></i>
                      {
                        question.possibleAnswers
                          .filter(possibleAnswer => answers.includes(possibleAnswer))
                          .map((possibleAnswer, answerIndex) =>
                            <button className='reviewInterviewAnswer' key={answerIndex}>{TAPi18n.__('interview.' + possibleAnswer)}</button>
                          )
                      }
                    </div>
                </div>)
              }

              if(question.question == 'what_words_2') {
                return (<div key={index}>
                        <div className='reviewInterviewAnswers'>
                        {
                            question.possibleAnswers
                              .filter(possibleAnswer => answers.includes(possibleAnswer))
                              .map((possibleAnswer, answerIndex) =>
                                <button className='reviewInterviewAnswer'key={answerIndex}>{TAPi18n.__('interview.' + possibleAnswer)}</button>
                              )
                          }
                        </div>
                </div>)
              }
              
              
              return (<div key={index}>
                  <button className='reviewInterviewQuestion'>{TAPi18n.__('interview.' + question.question)}</button>
                      <div className='reviewInterviewAnswers'>
                          <i><h4>Respondiste: </h4></i>
                          {
                          question.possibleAnswers
                            .filter(possibleAnswer => answers.includes(possibleAnswer))
                            .map((possibleAnswer, answerIndex) =>
                              <button className='reviewInterviewAnswer'key={answerIndex}>{TAPi18n.__('interview.' + possibleAnswer)}</button>
                            )
                         }
                    </div>
              </div>)
            })
          }
        </div>
        <div className="row" style={{marginTop: '20px'}}>
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