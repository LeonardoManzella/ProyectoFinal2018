import { ChatBotUtil } from 'i-chatbot'
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

class Logic {
  suggestions = [];
  static actual_plan_context = "";
  static getActualPlan = () => actual_plan_context;

  static translate = (string) => TAPi18n.__(string);
  static getPlanTitle = () => Logic.translate(`plan.${Logic.getActualPlan()}.title`);
  static getPlanDescription = () => Logic.translate(`plan.${Logic.getActualPlan()}.description`);
  static translateSuggestion = (suggestion) => Logic.translate(`suggestions.${suggestion.toString()}`);

  static getStarted = (plan_context) => { //Using a Closure and a Static variable to storage state client-side
    actual_plan_context = plan_context;

    return function(){
      //TODO pasar a meteor call argumento Logic.getActualPlan()
      Meteor.call('expert.consult', (error, suggestionsArray) => {
          if (error) {
            console.warn("--------------");
            console.error(error);
            console.trace();
            Logic.suggestions = ['Ninguna sugerencia por el momento', 'Vuelve a intentarlo mas tarde'];
          } else {
            console.log(`Plan Suggestions: ${suggestionsArray}`);
          Logic.suggestions = suggestionsArray;
          }
      });

      return [
        ChatBotUtil.textMessage(['Buenas!', 'Hola!'].any()),
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
      ChatBotUtil.textMessage(Logic.getPlanDescription(),
        ChatBotUtil.makeReplyButton('Ok! Lo tengo', Logic.menu)
      )
    ]
  }

  static menu () {
    return [
      ChatBotUtil.textMessage("¿En que puedo ayudarte?",
        ChatBotUtil.makeReplyButton(`Que es un ${Logic.getPlanTitle()}?`,() => Logic.plan()),
        ChatBotUtil.makeReplyButton('Sugerime Cosas',() =>  Logic.show_suggestions())
      )
    ]
  }

  static show_suggestions () {
    console.warn(Logic.suggestions);
    return [
      ChatBotUtil.textMessage('Veamos..')
    ].concat(
      Logic.suggestions.map( suggestion => ChatBotUtil.textMessage(Logic.translateSuggestion(suggestion)))
    ).concat(
      [
        ChatBotUtil.textMessage('Concentrate en esas por ahora'),
      ChatBotUtil.textMessage('Mas adelante habran mas sugerencias',
        ChatBotUtil.makeReplyButton('Entendido', Logic.menu)
      )
      ]
    );
  }
}

export default Logic