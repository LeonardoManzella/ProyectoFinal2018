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
            selectedAnswers: [],
            type: 'goal'
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
            selectedAnswers: [],
            type: 'goal'
        },

        {
            // FIXME por ahora lo dejamos en texto y en el futuro incorporamos lo de rubro ligero/facil o cmplejo/dificil
            "question" : "product_types_interested_on_selling",
            "possibleAnswers" : [
              "musica",
              "objetos_de_cultura",
              "muebles",
              "indumentaria",
              "disenio",
              "productos_audiovisuales",
              "otro"
            ],
            multipleSelection: true,
            selectedAnswers: [],
            type: 'goal'
          },
    
          {
            "question" : "services_types_interested_on_selling",
            "possibleAnswers" : [
              "allow_sell_talks",
              "allow_sell_workshops",
              "dont_allow_talks_workshops"
            ],
            multipleSelection: true,
            selectedAnswers: [],
            type: 'goal'
          },
    
          {
            "question" : "digital_or_physical",
            "possibleAnswers" : [
              "physical",
              "digital"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'goal'
          },
    
          {
            "question" : "local_or_global",
            "possibleAnswers" : [
              "local",
              "global"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'goal'
          },
    
          {
            "question" : "allow_association_or_not",
            "possibleAnswers" : [
              "allow_association",
              "dont_allow_association"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'goal'
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
            selectedAnswers: [],
            type: 'contribution'
          },
          
          {
            question : "has_or_account_question",
            possibleAnswers : [
              "has_account",
              "doesnt_have_account"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },
    
          {
            "question" : "have_credit_question",
            "possibleAnswers" : [
              "has_credit_history",
              "doesnt_have_credit_history"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },
    
          {
            "question" : "has_passport_question",
            "possibleAnswers" : [
              "has_passport",
              "doesnt_have_passport"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
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
            selectedAnswers: [],
            type: 'contribution'
          },
    
          {
            "question" : "has_partner_question",
            "possibleAnswers" : [
              "has_partner",
              "alone"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },
    
          {
            "question" : "has_balance_question",
            "possibleAnswers" : [
              "has_balance",
              "doesnt_have_balance"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },

          {
            "question" : "has_experience_leading_question",
            "possibleAnswers" : [
              "has_followers",
              "doesnt_have_followers"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },

          {
            "question" : "has_achievements_question",
            "possibleAnswers" : [
              "has_achievements",
              "doesnt_have_achievements"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },

          {
            "question" : "has_contacts_question",
            "possibleAnswers" : [
              "has_contacts",
              "doesnt_have_contacts"
            ],
            multipleSelection: false,
            selectedAnswers: [],
            type: 'contribution'
          },

          // ----------------------------- CONTRIBUTIONS QUESTIONS

          // ----------------------------- IDENTITY QUESTIONS -----------------------------
          {
            "question" : "what_words_1",
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
              "class_and_style"
            ],
            multipleSelection: true,
            selectedAnswers: [],
            type: 'identity'
          },

          {
            "question" : "what_words_2",
            "possibleAnswers" : [
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
            selectedAnswers: [],
            type: 'identity'
          },

          {
            "question" : "perpetual_identity",
            "possibleAnswers" : [
              
            ],
            multipleSelection: true,
            selectedAnswers: [],
            type: 'perpetual_identity'
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
            selectedAnswers: [],
            type: 'identity'
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

        if(question.question == 'perpetual_identity' && question.possibleAnswers.length == 0) {
          InterviewQuestions.buildPerpertualIdentityPossibleAnswers();
        }

        return question.possibleAnswers
            .filter(answer => !question.selectedAnswers.includes(answer));
    }

    static buildPerpertualIdentityPossibleAnswers() {
      const words1 = InterviewQuestions.getQuestionByName('what_words_1').selectedAnswers;
      const words2 = InterviewQuestions.getQuestionByName('what_words_2').selectedAnswers;
      
      const selectedWords = words1.concat(words2);

      InterviewQuestions.getQuestionByName('perpetual_identity').possibleAnswers = selectedWords;
    }

    static getQuestionByName(questionName) {
      return InterviewQuestions.allQuestions.filter(q => q.question == questionName)[0];
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

    static getAllSelectedAnswers() {
      let goals = [];
      let contributions = [];
      let identity_traits = [];
      let perpetual_identity = [];

      InterviewQuestions.allQuestions.forEach(function (question) {
        if (question.type == 'goal') {
          goals = goals.concat(question.selectedAnswers);
        }
        if (question.type == 'contribution') {
          contributions = contributions.concat(question.selectedAnswers);
        }
        if (question.type == 'identity') {
          identity_traits = identity_traits.concat(question.selectedAnswers);
        }
        if (question.type == 'perpetual_identity') {
          perpetual_identity = perpetual_identity.concat(question.selectedAnswers);
        }
      });
      
      return {
        goals,
        contributions,
        identity_traits,
        perpetual_identity
      };
    }

}

export default InterviewQuestions