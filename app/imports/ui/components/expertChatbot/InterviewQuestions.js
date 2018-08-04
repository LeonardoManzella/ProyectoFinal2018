class InterviewQuestions {

    static allQuestions = [

        {
            question : "what_goals",
            possibleAnswers : [
              "have_fun",
              "wants_money",
              "travel",
              "strengthen_your_team",
              "wants_recognition", 
              "wants_brag",
              "startup_with_friends",
              "wants_authority",
              "wants_order",
              "flexibility"
            ],
            multipleSelection: true,
            selectedAnswers: []
          },
          
          {
            question : "what_to_sell",
            possibleAnswers : [
              "product",
              "service",
              "product_and_service",
              "doesnt_know"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            // FIXME por ahora lo dejamos en texto y en el futuro incorporamos lo de rubro ligero/facil o cmplejo/dificil
            "question" : "product_types_interested_on_selling",
            "possibleAnswers" : [
              "Música",
              "Objetos de Cultura",
              "Muebles",
              "Indumentaria",
              "Diseño",
              "Productos Audiovisuales",
              "Otro"
            ],
            multipleSelection: true,
            selectedAnswers: []
          },
    
          {
            "question" : "services_types_interested_on_selling",
            "possibleAnswers" : [
              "allow_sell_talks",
              "allow_sell_workshops",
              "dont_allow_talks_workshops"
            ],
            multipleSelection: true,
            selectedAnswers: []
          },
    
          {
            "question" : "digital_or_physical",
            "possibleAnswers" : [
              "physical",
              "digital"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "local_or_global",
            "possibleAnswers" : [
              "local",
              "global"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "allow_association_or_not",
            "possibleAnswers" : [
              "allow_association",
              "dont_allow_association"
            ],
            multipleSelection: false,
            selectedAnswers: []
          }

    ]

    static getQuestion(questionNumber) {
        return InterviewQuestions.allQuestions[questionNumber - 1];
    }

    static allowsMultipleSelection(questionNumber) {
        return InterviewQuestions.getQuestion(questionNumber).multipleSelection;
    }

    static getPossibleAnswers(questionNumber) {
        const question = InterviewQuestions.getQuestion(questionNumber);

        return question.possibleAnswers
            .filter(answer => !question.selectedAnswers.includes(answer));
    }

    static selectAnswer(questionNumber, answer) {
        InterviewQuestions
            .getQuestion(questionNumber)
            .selectedAnswers.push(answer);
    }

    static hasChosenAtLeastOneAnswer(questionNumber) {
        return InterviewQuestions.getQuestion(questionNumber)
            .selectedAnswers
            .length > 0;
    }

}

export default InterviewQuestions