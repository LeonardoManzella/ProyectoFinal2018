class InterviewQuestions {

    static allQuestions = [

      // ----------------------------- GOALS QUESTIONS -----------------------------
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
          },

          // ----------------------------- .GOALS QUESTIONS

          // ----------------------------- CONTRIBUTIONS QUESTIONS -----------------------------
          {
            question : "have_funding_question",
            possibleAnswers : [
              "has_savings_or_funding",
              "cash_deprived"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
          
          {
            question : "has_or_account_question",
            possibleAnswers : [
              "has_account",
              "doesnt_have_account"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "have_credit_question",
            "possibleAnswers" : [
              "has_credit_history",
              "doesnt_have_credit_history de Cultura"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "has_passport_question",
            "possibleAnswers" : [
              "has_passport",
              "doesnt_have_passport"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "what_education_level",
            "possibleAnswers" : [
              "high_school",
              "tertiary",
              "university",
              "post_graduate"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "has_partner_question",
            "possibleAnswers" : [
              "has_partner",
              "alone"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },
    
          {
            "question" : "has_balance_question",
            "possibleAnswers" : [
              "has_balance",
              "doesnt_have_balance"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },

          {
            "question" : "has_experience_leading_question",
            "possibleAnswers" : [
              "has_followers",
              "doesnt_have_followers"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },

          {
            "question" : "has_achievements_question",
            "possibleAnswers" : [
              "has_achievements",
              "doesnt_have_achievements"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },

          {
            "question" : "has_contacts_question",
            "possibleAnswers" : [
              "has_contacts",
              "doesnt_have_contacts"
            ],
            multipleSelection: false,
            selectedAnswers: []
          },

          // ----------------------------- CONTRIBUTIONS QUESTIONS

          // ----------------------------- IDENTITY QUESTIONS -----------------------------
          {
            "question" : "what_words",
            "possibleAnswers" : [
              "hate_numbers",
              "extrovert",
              "likes_travel",
              "techie",
              "ambitious",
              "organized",
              "trustfull",
              "social",
              "non_social",
              "creative",
              "mentally_strong",
              "class_and_style",
              "shy_and_afraid",
              "persistent",
              "humorous",
              "passion",
              "curious",
              "independent",
              "stressfully",
              "distrustful",
              "easy_learner",
              "transgressor",
              "disorganized",
              "anxious"
            ],
            multipleSelection: true,
            selectedAnswers: []
          },

          {
            "question" : "who_wants_to_sell_so",
            "possibleAnswers" : [
              "young_client",
              "adult_client",
              "old_client",
              "non_profit"
            ],
            multipleSelection: false,
            selectedAnswers: []
          }
          // ----------------------------- IDENTITY QUESTIONS

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