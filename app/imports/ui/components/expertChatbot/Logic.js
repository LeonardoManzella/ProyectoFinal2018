import { ChatBotUtil } from 'i-chatbot'
import { TAPi18n } from 'meteor/tap:i18n';

// For each question, an array of boolean indicating if it is a multiple answer selection
let GOALS_QUESTIONS = [
  { 
    'question': 1,
    'answersAmount': 2,
    'selectedAnswers': [],
    'multipleSelection': true
  },
  { 
    'question': 2,
    'answersAmount': 4,
    'selectedAnswers': [],
    'multipleSelection': true
  }
];

let CONTRIBUTIONS_QUESTIONS = [
  { 
    'question': 1,
    'answersAmount': 2,
    'selectedAnswers': [],
    'multipleSelection': false
  },
  { 
    'question': 2,
    'answersAmount': 2,
    'selectedAnswers': [],
    'multipleSelection': false
  }
];

let IDENTITY_QUESTIONS = [
  { 
    'question': 1,
    'answersAmount': 2,
    'selectedAnswers': [],
    'multipleSelection': false
  },
  { 
    'question': 2,
    'answersAmount': 2,
    'selectedAnswers': [],
    'multipleSelection': false
  }
];

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
      GOALS_QUESTIONS[currentQuestionNumber - 1].selectedAnswers.push(answerToChoose);
      if(GOALS_QUESTIONS[currentQuestionNumber - 1].answersAmount == GOALS_QUESTIONS[currentQuestionNumber - 1].selectedAnswers.length
        || !GOALS_QUESTIONS[currentQuestionNumber - 1].multipleSelection) {
        return Logic.goalQuestion();
      }
    }

    if (stepIndex == 1) {
      CONTRIBUTIONS_QUESTIONS[currentQuestionNumber - 1].selectedAnswers.push(answerToChoose);
      if(CONTRIBUTIONS_QUESTIONS[currentQuestionNumber - 1].answersAmount == CONTRIBUTIONS_QUESTIONS[currentQuestionNumber - 1].selectedAnswers.length
        || !CONTRIBUTIONS_QUESTIONS[currentQuestionNumber - 1].multipleSelection) {
        return Logic.contributionQuestion();
      }
    }

    if (stepIndex == 2) {
      IDENTITY_QUESTIONS[currentQuestionNumber - 1].selectedAnswers.push(answerToChoose);
      if(IDENTITY_QUESTIONS[currentQuestionNumber - 1].answersAmount == IDENTITY_QUESTIONS[currentQuestionNumber - 1].selectedAnswers.length
        || !IDENTITY_QUESTIONS[currentQuestionNumber - 1].multipleSelection) {
        return Logic.identityQuestion();
      }
    }

    Logic.currentQuestion = '###EMPTY###';
    const hasToShowNextQuestionAnswer = true;
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static goalAnswersGenerator (_currentQuestionNumber) {
    let currentPossibleAnswers = [];

    const possibleAnswersAmount = GOALS_QUESTIONS[_currentQuestionNumber - 1].answersAmount;

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen =  GOALS_QUESTIONS[_currentQuestionNumber - 1].selectedAnswers.includes(answerNumber); 
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

    const possibleAnswersAmount = CONTRIBUTIONS_QUESTIONS[_currentQuestionNumber - 1].answersAmount;

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen = CONTRIBUTIONS_QUESTIONS[_currentQuestionNumber - 1].selectedAnswers.includes(answerNumber); 
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

    const possibleAnswersAmount = IDENTITY_QUESTIONS[_currentQuestionNumber - 1].answersAmount;

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen = IDENTITY_QUESTIONS[_currentQuestionNumber - 1].selectedAnswers.includes(answerNumber); 
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

    if (Logic.currentQuestionNumber > GOALS_QUESTIONS.length){
      Logic.currentStepIndex = 1;
      Logic.currentQuestionNumber = 0;
      return Logic.contributionQuestion();
    }
    
    Logic.currentQuestion = tgq(Logic.currentQuestionNumber); 
    
    const _currentQuestionNumber = Logic.currentQuestionNumber;

    Logic.nextCallback = Logic.goalQuestion;
    
    Logic.generatePossibleAnswers = () => Logic.goalAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  GOALS_QUESTIONS[_currentQuestionNumber - 1].selectedAnswers.length > 0;
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static contributionQuestion () {
    Logic.currentQuestionNumber++;
    Logic.currentQuestion = tcq(Logic.currentQuestionNumber); 
    
    if (Logic.currentQuestionNumber > CONTRIBUTIONS_QUESTIONS.length){
      Logic.currentStepIndex = 2;
      Logic.currentQuestionNumber = 0;
      return Logic.identityQuestion();
    }

    Logic.nextCallback = Logic.contributionQuestion;

    const _currentQuestionNumber = Logic.currentQuestionNumber;

    Logic.generatePossibleAnswers = () => Logic.contributionAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  CONTRIBUTIONS_QUESTIONS[_currentQuestionNumber - 1].selectedAnswers.length > 0;
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static identityQuestion () {
    Logic.currentQuestionNumber++;
    Logic.currentQuestion = tiq(Logic.currentQuestionNumber); 
    
    if (Logic.currentQuestionNumber > IDENTITY_QUESTIONS.length){
      return Logic.end();
    }

    const _currentQuestionNumber = Logic.currentQuestionNumber;

    Logic.nextCallback = Logic.identityQuestion;

    Logic.generatePossibleAnswers = () => Logic.identityAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  IDENTITY_QUESTIONS[_currentQuestionNumber - 1].selectedAnswers.length > 0;
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