import { ChatBotUtil } from 'i-chatbot'
import { TAPi18n } from 'meteor/tap:i18n';

const t = function (text) {
  return TAPi18n.__('interview.' + text);
}

const tgq = function (questionNumber) {
  return t('goals.' + questionNumber + '.question');
}

const tgqa = function (questionNumber, answerNumber) {
  return t('goals.' + questionNumber + '.answers.' + answerNumber);
}

const tcq = function (questionNumber) {
  return t('contributions.' + questionNumber + '.question');
}

const tcqa = function (questionNumber, answerNumber) {
  return t('contributions.' + questionNumber + '.answers.' + answerNumber);
}

const tiq = function (questionNumber) {
  return t('identity.' + questionNumber + '.question');
}

const tiqa = function (questionNumber, answerNumber) {
  return t('identity.' + questionNumber + '.answers.' + answerNumber);
}

const buildCurrentQuestion = function (hasToShowNextQuestionAnswer) {
  let questionAswersArray = [Logic.currentQuestion];

  Logic.possibleAnswers = Logic.generatePossibleAnswers();
  questionAswersArray = questionAswersArray.concat(Logic.possibleAnswers);
 
  if (hasToShowNextQuestionAnswer) {
    questionAswersArray.push(
      ChatBotUtil.makeReplyButton(
        t('nextQuestion'),
        Logic.nextCallback
      )
    );
  }

  return [
    ChatBotUtil.textMessage.apply(
      this,
      questionAswersArray
    )
  ]

}

class Logic {
  
  static goalsQuestionsAmount; 
  static hasChosenGoalAnswer;
  static selectGoalAnswer;
  static hasChosenAtLeastOneGoalAnswer;
  static goalsQuestionAnswersAmount;
  static hasToJumpToNextGoalQuestion;

  static contributionsQuestionsAmount; 
  static hasChosenContributionAnswer;
  static selectContributionAnswer;
  static hasChosenAtLeastOneContributionAnswer;
  static contributionsQuestionAnswersAmount;
  static hasToJumpToNextContributionQuestion;

  static identityQuestionsAmount; 
  static hasChosenIdentityAnswer;
  static selectIdentityAnswer;
  static hasChosenAtLeastOneIdentityAnswer;
  static identityQuestionAnswersAmount;
  static hasToJumpToNextIdentityQuestion;

  static currentStepIndex;
  static currentQuestionNumber = 0;
  static currentQuestion;
  static generatePossibleAnswers;
  static nextCallback;
  static possibleAnswers;

  static getStarted () {
    const userName = Meteor.users.findOne().personalInformation.name;
    const getStartedQuestion = [
      t('greetings1') + ' ' + userName + '!',
      t('greetings2') + ' ' + userName + '!'
    ].any(); 

    Logic.currentStepIndex = 0;

    return [
      ChatBotUtil.textMessage(
        getStartedQuestion,
        ChatBotUtil.makeReplyButton(
          t('responseGreetings'),
          Logic.goalQuestion
        )
      )
    ]
  }


  static selectAnswerAndRepeatQuestion (stepIndex, currentQuestionNumber, answerToChoose) {
    
    if (stepIndex == 0) {
      Logic.selectGoalAnswer(currentQuestionNumber, answerToChoose);
    
      if(Logic.hasToJumpToNextGoalQuestion(currentQuestionNumber)) {
        return Logic.goalQuestion();
      }
    }

    if (stepIndex == 1) {
      Logic.selectContributionAnswer(currentQuestionNumber, answerToChoose);
    
      if(Logic.hasToJumpToNextContributionQuestion(currentQuestionNumber)) {
        return Logic.contributionQuestion();
      }
    }

    if (stepIndex == 2) {
      Logic.selectIdentityAnswer(currentQuestionNumber, answerToChoose);
    
      if(Logic.hasToJumpToNextIdentityQuestion(currentQuestionNumber)) {
        return Logic.identityQuestion();
      }
    }

    Logic.currentQuestion = t('youCanSelectMoreOptions');
    const hasToShowNextQuestionAnswer = true;
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static goalAnswersGenerator (_currentQuestionNumber) {
    let currentPossibleAnswers = [];

    const possibleAnswersAmount = Logic.goalsQuestionAnswersAmount(_currentQuestionNumber);

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen =  Logic.hasChosenGoalAnswer(_currentQuestionNumber, answerNumber); 
      if (hasBeenChosen) {
        continue;
      }

      const answerToChoose = answerNumber;
      currentPossibleAnswers.push(
        ChatBotUtil.makeReplyButton(
          tgqa(_currentQuestionNumber, answerNumber),
          () => Logic.selectAnswerAndRepeatQuestion(0, _currentQuestionNumber, answerToChoose)
        )
      );
    }

    return currentPossibleAnswers;
  }

  static contributionAnswersGenerator (_currentQuestionNumber) {
    let currentPossibleAnswers = [];

    const possibleAnswersAmount = Logic.contributionsQuestionAnswersAmount(_currentQuestionNumber);

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen =  Logic.hasChosenContributionAnswer(_currentQuestionNumber, answerNumber);
      if (hasBeenChosen) {
        continue;
      }

      const answerToChoose = answerNumber;
      currentPossibleAnswers.push(
        ChatBotUtil.makeReplyButton(
          tcqa(_currentQuestionNumber, answerNumber),
          () => Logic.selectAnswerAndRepeatQuestion(1, _currentQuestionNumber, answerToChoose)
        )
      );
    }

    return currentPossibleAnswers;
  }

  static identityAnswersGenerator (_currentQuestionNumber) {
    let currentPossibleAnswers = [];

    const possibleAnswersAmount = Logic.identityQuestionAnswersAmount(_currentQuestionNumber);

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen =  Logic.hasChosenIdentityAnswer(_currentQuestionNumber, answerNumber); 
      if (hasBeenChosen) {
        continue;
      }

      const answerToChoose = answerNumber;
      currentPossibleAnswers.push(
        ChatBotUtil.makeReplyButton(
          tiqa(_currentQuestionNumber, answerNumber),
          () => Logic.selectAnswerAndRepeatQuestion(2, _currentQuestionNumber, answerToChoose)
        )
      );
    }

    return currentPossibleAnswers;
  }

  static goalQuestion () {
    Logic.currentQuestionNumber++;

    if (Logic.currentQuestionNumber > Logic.goalsQuestionsAmount){
      Logic.currentStepIndex = 1;
      Logic.currentQuestionNumber = 0;
      return Logic.contributionQuestion();
    }
    
    Logic.currentQuestion = tgq(Logic.currentQuestionNumber); 
    
    const _currentQuestionNumber = Logic.currentQuestionNumber;

    Logic.nextCallback = Logic.goalQuestion;
    
    Logic.generatePossibleAnswers = () => Logic.goalAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  Logic.hasChosenAtLeastOneGoalAnswer(_currentQuestionNumber);
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static contributionQuestion () {
    Logic.currentQuestionNumber++;
    Logic.currentQuestion = tcq(Logic.currentQuestionNumber); 
    
    if (Logic.currentQuestionNumber > Logic.contributionsQuestionsAmount){
      Logic.currentStepIndex = 2;
      Logic.currentQuestionNumber = 0;
      return Logic.identityQuestion();
    }

    Logic.nextCallback = Logic.contributionQuestion;

    const _currentQuestionNumber = Logic.currentQuestionNumber;

    Logic.generatePossibleAnswers = () => Logic.contributionAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  Logic.hasChosenAtLeastOneContributionAnswer(_currentQuestionNumber);
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static identityQuestion () {
    Logic.currentQuestionNumber++;
    Logic.currentQuestion = tiq(Logic.currentQuestionNumber); 
    
    if (Logic.currentQuestionNumber > Logic.identityQuestionsAmount){
      return Logic.end();
    }

    const _currentQuestionNumber = Logic.currentQuestionNumber;

    Logic.nextCallback = Logic.identityQuestion;

    Logic.generatePossibleAnswers = () => Logic.identityAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  Logic.hasChosenAtLeastOneIdentityAnswer(_currentQuestionNumber);
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static end () {
    return [
      ChatBotUtil.textMessage(t('goodbye') + ' 😉'),
      ChatBotUtil.textMessage(t('goodbyeSuggestions') ,
        ChatBotUtil.makeReplyButton(t('goodbyeResponse')))
    ]
  }

}

export default Logic