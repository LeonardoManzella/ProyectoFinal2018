import { ChatBotUtil } from './../../../../lib/interview-chatbot/lib/index'
import { TAPi18n } from 'meteor/tap:i18n';
import InterviewQuestions from './InterviewQuestions.js'

const t = function (text) {
  return TAPi18n.__('interview.' + text);
}

class Logic {

  static currentQuestionNumber = 0;

  static getStarted () {
    const userName = Meteor.users.findOne().personalInformation.name;
    const getStartedQuestion = [
      t('greetings1') + ' ' + userName + '!',
      t('greetings2') + ' ' + userName + '!'
    ].any(); 

    Logic.currentQuestionNumber = 0;

    return [
      ChatBotUtil.textMessage(
        getStartedQuestion,
        ChatBotUtil.makeReplyButton(
          t('responseGreetings'),
          Logic.nextQuestion
        )
      )
    ]
  }

  static continueInterview (questionNumber) {
    console.log('loaded questionNumber ' + questionNumber);
    Logic.currentQuestionNumber = questionNumber - 1;
    return Logic.nextQuestion()
  }

  static nextQuestion () {
    Logic.currentQuestionNumber++;
    Logic.saveInterviewState(false);

    const questionNumber = Logic.currentQuestionNumber;
    if (questionNumber > InterviewQuestions.allQuestions.length){
      return Logic.end();
    }
    
    const possibleAnswers = InterviewQuestions.getPossibleAnswers(questionNumber);

    const hasSelectedAllAnswers = possibleAnswers.length == 0; 
    if (hasSelectedAllAnswers) {
      return Logic.nextQuestion();
    }
        
    return Logic.buildQuestion(questionNumber, possibleAnswers, false);
  }

  static repeatQuestion () {
    const questionNumber = Logic.currentQuestionNumber;
    if (questionNumber > InterviewQuestions.allQuestions.length){
      return Logic.end();
    }
    
    const possibleAnswers = InterviewQuestions.getPossibleAnswers(questionNumber);

    const hasSelectedAllAnswers = possibleAnswers.length == 0; 
    if (hasSelectedAllAnswers) {
      return Logic.nextQuestion();
    }
        
    return Logic.buildQuestion(questionNumber, possibleAnswers, true);
  }

  static buildQuestion (questionNumber, possibleAnswers, isRepeating) {
    const botBuilderArray = isRepeating ? ['###REMOVE_ME###'] : [
      t(InterviewQuestions.getQuestion(questionNumber).question)
    ];

    const builtAnswers = Logic.buildAnswers(questionNumber, possibleAnswers);
    botBuilderArray = botBuilderArray.concat(builtAnswers);

    if (InterviewQuestions.hasChosenAtLeastOneAnswer(questionNumber)) {
      botBuilderArray.push(
        ChatBotUtil.makeReplyButton(
          t('nextQuestion'),
          Logic.nextQuestion
        )
      );
    }
  
    return [
      ChatBotUtil.textMessage.apply(
        this,
        botBuilderArray
      )
    ]
  }

  static buildAnswers (questionNumber, possibleAnswers) {
    
    let builtPossibleAnswers = [];
    for(var i = 0; i< possibleAnswers.length; i++){
      let answerCallback;
      const answerToChose = possibleAnswers[i];
      if (InterviewQuestions.allowsMultipleSelection(questionNumber)) {
        answerCallback = () => Logic.selectAnswerAndRepeatQuestion(
                                  questionNumber,
                                  answerToChose);
      } else {
        answerCallback = () => Logic.selectAnswerAndGoToNextQuestion(
                                  questionNumber,
                                  answerToChose);
      }
      
      builtPossibleAnswers.push(
        ChatBotUtil.makeReplyButton(
          t(possibleAnswers[i]),
          answerCallback
        )
      );
    }

    return builtPossibleAnswers;

  }

  static selectAnswerAndGoToNextQuestion (questionNumber, answerToChoose) {
    InterviewQuestions.selectAnswer(questionNumber, answerToChoose);

    return Logic.nextQuestion();
  }

  static selectAnswerAndRepeatQuestion (questionNumber, answerToChoose) {
    InterviewQuestions.selectAnswer(questionNumber, answerToChoose);
  
    return Logic.repeatQuestion();
  }

  static end () {
    Logic.saveInterviewState(true)

    return [
      ChatBotUtil.textMessage(t('goodbye') + ' 😉'),
      ChatBotUtil.textMessage(t('goodbyeSuggestions') ,
        ChatBotUtil.makeReplyButton(t('goodbyeResponse'), () => {
          if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
            Meteor.user() && Meteor.user().personalInformation.status === 'pendingAreas') {
            FlowRouter.go('canvas');
          } else {
            FlowRouter.go('planList');
          }
        }))
    ]
  }

  static saveInterviewState (hasEndedInterview) {
    const selectedAnswers = InterviewQuestions.getAllSelectedAnswers();
    Meteor.call('saveTraits', Meteor.users.findOne(), 
      selectedAnswers,
      Logic.currentQuestionNumber,
      hasEndedInterview);
  }

}

export default Logic