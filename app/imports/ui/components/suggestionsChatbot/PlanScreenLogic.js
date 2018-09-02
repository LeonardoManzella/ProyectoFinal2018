import { ChatBotUtil } from 'i-chatbot'
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

class Logic {
  static suggestions = [];
  static actual_plan_context = "";
  static getActualPlan = () => actual_plan_context;

  static translate = (string) => TAPi18n.__(string);
  static getPlanTitle = () => Logic.translate(`plan.${Logic.getActualPlan()}.title`);
  static getPlanDescriptions = () => 
    [].concat(
      Logic.translate(`plan.${Logic.getActualPlan()}.description_part_1`)
      ).concat(
      Logic.translate(`plan.${Logic.getActualPlan()}.description_part_2`) 
      );
  static getPlanGuide = () => 
    [].concat(
      Logic.translate(`plan.${Logic.getActualPlan()}.guide_part_1`)
      ).concat(
      Logic.translate(`plan.${Logic.getActualPlan()}.guide_part_2`) 
      );
  static translateSuggestion = (suggestion) => Logic.translate(`suggestions.${suggestion.toString()}`);

  static getStarted = (plan_context) => { //Using a Closure and a Static variable to storage state client-side
    actual_plan_context = plan_context;

    return function(){
      return [
        ChatBotUtil.textMessage(['Buenas!', 'Hola!'].any()),
        ChatBotUtil.textMessage('Voy a darte sugerencias para ayudarte a emprender'),
        ChatBotUtil.textMessage('Tene en cuenta que puede llevar un rato, ponete comodo antes de comenzar'),
        ChatBotUtil.textMessage(`Bueno, empezemos con tu ${Logic.getPlanTitle()}`,
          ChatBotUtil.makeReplyButton('Dale', Logic.menu)
        )
      ]
    }
  }

  static plan () {
    const actual_plan_context = this.getActualPlan();
    console.log(actual_plan_context + ' was selected');
    return [
      ChatBotUtil.textMessage(`Un ${Logic.getPlanTitle()} te permite...`),
      ...Logic.getPlanDescriptions().map(description => ChatBotUtil.textMessage(description)),
      ChatBotUtil.textMessage(`Por eso se llama ${Logic.getPlanTitle()}.`,
        ChatBotUtil.makeReplyButton('Ok! Lo tengo', Logic.menu)
      )
    ]
  }

  static menu () {
    Meteor.call('expert.consult', Logic.getActualPlan(), (error, suggestionsArray) => {
          if (error) {
            console.warn("--------------");
            console.error(error);
            console.trace();
            Logic.suggestions = ['Ninguna sugerencia por el momento', 'Vuelve a intentarlo mas tarde'];
          } else {
            console.log(`Plan Suggestions: ${suggestionsArray}`);
          Logic.suggestions = suggestionsArray;
          Logic.suggestions.reverse();
          }
      });
    
    return [
      ChatBotUtil.textMessage("¿En que puedo ayudarte?",
        ChatBotUtil.makeReplyButton(`Que es un ${Logic.getPlanTitle()}?`,() => Logic.plan()),
        ChatBotUtil.makeReplyButton('Guiame',() =>  Logic.guide()),
        ChatBotUtil.makeReplyButton('Sugerime Cosas',() =>  Logic.show_first_suggestions())
      )
    ]
  }

  static show_first_suggestions () {
    let suggestionsToShow = Logic.popSuggestions(Logic.suggestions, 3);
    return [
        ChatBotUtil.textMessage('Basandome en tus caracteristicas..')
      ].concat(
        suggestionsToShow.map( suggestion => ChatBotUtil.textMessage(Logic.translateSuggestion(suggestion)))
      ).concat(
      [
        ChatBotUtil.textMessage('Concentrate en esas por ahora',
          ChatBotUtil.makeReplyButton('Entendido', Logic.menu),
          ChatBotUtil.makeReplyButton('Sugerime más cosas',() =>  Logic.show_more_suggestions())
        )
      ]);
  }
    
  static show_more_suggestions () {
    let suggestionsToShow = Logic.popSuggestions(Logic.suggestions, 3);
    
    console.log('suggestionsToShow.length ' + suggestionsToShow.length);
    console.log('suggestions.length ' + Logic.suggestions.length);
    
    if (suggestionsToShow.length == 0) {
      return [
         ChatBotUtil.textMessage('Más adelante habrá más sugerencias',
            ChatBotUtil.makeReplyButton('Entendido', Logic.menu)
          )
        ];
    }
    
    let builtSuggestionsToShow = [];
    for (var i = 0; i < suggestionsToShow.length - 1; i++){
      builtSuggestionsToShow.push(
        ChatBotUtil.textMessage(Logic.translateSuggestion(suggestionsToShow[i]))
      );
    }
    builtSuggestionsToShow.push(
      ChatBotUtil.textMessage(Logic.translateSuggestion(suggestionsToShow[suggestionsToShow.length - 1]),
        ChatBotUtil.makeReplyButton('Entendido', Logic.menu),
        ChatBotUtil.makeReplyButton('Sugerime más cosas',() =>  Logic.show_more_suggestions())
      )
    );
    return builtSuggestionsToShow;
  }

  static popSuggestions (_array, amount) {
    let toReturn = [];
    for (var i = 0; i< amount; i++){
        var itemToAdd = _array.pop();
        if(itemToAdd == undefined) {
          return toReturn;  
        }
        toReturn.push(itemToAdd);
    }
    return toReturn;
  }
  
  static guide () {
    return [
      ChatBotUtil.textMessage('Dale! Te guio...')
    ].concat(
      Logic.getPlanGuide().map( guide_part => ChatBotUtil.textMessage(guide_part))
    ).concat(
      [
        ChatBotUtil.textMessage('Siguiendo esto vas a estar bien',
        ChatBotUtil.makeReplyButton('Gracias!', Logic.menu)
      )
      ]
    );
  }
}

export default Logic