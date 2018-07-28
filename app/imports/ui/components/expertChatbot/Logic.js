import { ChatBotUtil } from 'i-chatbot'
import { TAPi18n } from 'meteor/tap:i18n';

const saveAnswer = function (step, questionNumber, answerNumber) {

}

const GOALS_QUESTIONS_ANSWERS_AMOUNT = [
  2, 4
];

const CONTRIBUTIONS_QUESTIONS_ANSWERS_AMOUNT = [
  2, 2
];

const IDENTITY_QUESTIONS_ANSWERS_AMOUNT = [
  2, 2
];

const t = function (text) {
  return TAPi18n.__('interview.' + text);
}

const tgq = function (questionNumber) {
  return t('goals.' + questionNumber + '.question');
}

const tgqa = function (questionNumber, answerNumber) {

  console.log('translating answer: ' + answerNumber);

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
  let questionAswersArray = [];

  console.log('building current question');

  
  questionAswersArray.push(Logic.currentQuestion);

  Logic.possibleAnswers = Logic.generatePossibleAnswers();

  questionAswersArray = questionAswersArray.concat(Logic.possibleAnswers);
 
  if (hasToShowNextQuestionAnswer) {
    questionAswersArray.push(
      ChatBotUtil.makeReplyButton(
        'Siguiente pregunta',
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

  static chosenAnswers = [
    {}, {}, {}
  ];

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
    
    Logic.chosenAnswers[stepIndex]['q' + currentQuestionNumber].push('a' + answerToChoose); 
   
    //return Logic.goalQuestion();

    console.log(Logic.chosenAnswers[0]);

    Logic.currentQuestion = '###EMPTY###';
    const hasToShowNextQuestionAnswer = true;
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static goalAnswersGenerator (_currentQuestionNumber) {
    let currentPossibleAnswers = [];

    const possibleAnswersAmount = GOALS_QUESTIONS_ANSWERS_AMOUNT[_currentQuestionNumber - 1];

    Logic.chosenAnswers[0]['q' + _currentQuestionNumber] = Logic.chosenAnswers[0]['q' + _currentQuestionNumber] || [];

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen = Logic.chosenAnswers[0]['q' + _currentQuestionNumber].includes('a' + answerNumber); 
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

    const possibleAnswersAmount = CONTRIBUTIONS_QUESTIONS_ANSWERS_AMOUNT[_currentQuestionNumber - 1];

    Logic.chosenAnswers[1]['q' + _currentQuestionNumber] = Logic.chosenAnswers[1]['q' + _currentQuestionNumber] || [];

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen = Logic.chosenAnswers[1]['q' + _currentQuestionNumber].includes('a' + answerNumber); 
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

    const possibleAnswersAmount = IDENTITY_QUESTIONS_ANSWERS_AMOUNT[_currentQuestionNumber - 1];

    Logic.chosenAnswers[2]['q' + _currentQuestionNumber] = Logic.chosenAnswers[2]['q' + _currentQuestionNumber] || [];

    for(var answerNumber = 1; answerNumber <= possibleAnswersAmount; answerNumber++){
      const hasBeenChosen = Logic.chosenAnswers[2]['q' + _currentQuestionNumber].includes('a' + answerNumber); 
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
    Logic.currentQuestion = tgq(Logic.currentQuestionNumber); 
    
    const _currentQuestionNumber = Logic.currentQuestionNumber;

    if (Logic.currentQuestionNumber == GOALS_QUESTIONS_ANSWERS_AMOUNT.length){
      Logic.currentStepIndex = 1;
      Logic.currentQuestionNumber = 0;
      Logic.nextCallback = Logic.contributionQuestion;
    } else {
      Logic.nextCallback = Logic.goalQuestion;
    }
    
    Logic.generatePossibleAnswers = () => Logic.goalAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  Logic.chosenAnswers[0]['q' + _currentQuestionNumber]
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static contributionQuestion () {
    Logic.currentQuestionNumber++;
    Logic.currentQuestion = tcq(Logic.currentQuestionNumber); 
    
    const _currentQuestionNumber = Logic.currentQuestionNumber;

    if (Logic.currentQuestionNumber == CONTRIBUTIONS_QUESTIONS_ANSWERS_AMOUNT.length){
      Logic.currentStepIndex = 2;
      Logic.currentQuestionNumber = 0;
      Logic.nextCallback = Logic.identityQuestion;
    } else {
      Logic.nextCallback = Logic.contributionQuestion;
    }
    
    Logic.generatePossibleAnswers = () => Logic.contributionAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  Logic.chosenAnswers[2]['q' + _currentQuestionNumber]
    return buildCurrentQuestion(hasToShowNextQuestionAnswer);
  }

  static identityQuestion () {
    Logic.currentQuestionNumber++;
    Logic.currentQuestion = tiq(Logic.currentQuestionNumber); 
    
    const _currentQuestionNumber = Logic.currentQuestionNumber;

    if (Logic.currentQuestionNumber == IDENTITY_QUESTIONS_ANSWERS_AMOUNT.length){
      Logic.nextCallback = Logic.end;
    } else {
      Logic.nextCallback = Logic.identityQuestion;
    }
    
    Logic.generatePossibleAnswers = () => Logic.identityAnswersGenerator(_currentQuestionNumber);

    const hasToShowNextQuestionAnswer =  Logic.chosenAnswers[2]['q' + _currentQuestionNumber]
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