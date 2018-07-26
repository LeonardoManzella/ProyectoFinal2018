import { ChatBotUtil } from 'i-chatbot'
//import ExpertSystem from '../../../../server/expert.js'
import { Meteor } from 'meteor/meteor';

class Logic {
  suggestions = [];
  
  

  static getStarted () {
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
      ChatBotUtil.textMessage('Bueno, empezemos con tu Plan de Comunicacion',
        ChatBotUtil.makeReplyButton('Dale', Logic.menu)
      )
    ]
  }

  static plan (actual_plan_context) {
    console.log(actual_plan_context + ' was selected');
    return [
      ChatBotUtil.textMessage(`Un plan de ${actual_plan_context} te permite...`),
      ChatBotUtil.textMessage('Bla bla bla',
        ChatBotUtil.makeReplyButton('Ok! Lo tengo', Logic.menu)
      )
    ]
  }

  static menu () {
    return [
      ChatBotUtil.textMessage("¿En que puedo ayudarte?",
        ChatBotUtil.makeReplyButton('Que es un Plan de Comunicacion?',() => Logic.plan('Comunicacion')),
        ChatBotUtil.makeReplyButton('Sugerime Cosas',() =>  Logic.show_suggestions('Comunicacion'))
      )
    ]
  }

  static show_suggestions (value) {
    console.warn(Logic.suggestions);
    //TODO estaba trabajando aca y tengo que debuggear hasta donde llega que se colgo, ver React developer tools
    return [
      ChatBotUtil.textMessage('Veamos..')
    ].concat(
      Logic.suggestions.map( suggestion => ChatBotUtil.textMessage(suggestion.toString()))
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