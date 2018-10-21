import { Meteor } from 'meteor/meteor';
import { Engine } from 'swipl-stdio';
import fs from 'fs';


if (Meteor.isServer) {
  
    Meteor.methods({
      'expert.consult'(actual_plan_context) {
        console.log(`actual_plan_context: ${actual_plan_context}`);
          
        const sortByFrequency = (array) => {
            var frequency = {};

            array.forEach(function(value) { frequency[value] = 0; });

            var uniques = array.filter(function(value) {
                return ++frequency[value] == 1;
            });

            return uniques.sort(function(anElement, anotherElement) {
                return frequency[anotherElement] - frequency[anElement];
            });
        };

        const fromRecursionToArray = (recursion) => {
            var array = [];

            while (recursion.head ) { //Breaks recursion using head,tail decomposition
                array.push(recursion.head);
                console.log(`Added ${recursion.head} suggestion`);
                recursion = recursion.tail;
            }
            return array;
        };

        const engine = new Engine();

        const absolutePath = Assets.absoluteFilePath('prologFiles/expert_system_algorithm.pl');
        engine.call("consult('" + absolutePath + "')");
        

        let promise = new Promise((resolve) => {
            (async () => {
                // TODO obtain string and arrays from user 
                console.log(`actual_plan_context in Promise: ${actual_plan_context}`);
                let replace_with_user_goals = Meteor.users.findOne(this.userId).goals;
                console.log(`user Goals: ${JSON.stringify(replace_with_user_goals)}`);
                let goals = JSON.stringify(replace_with_user_goals).replace(/\"/g,'');
                let contributions = JSON.stringify(Meteor.users.findOne(this.userId).contributions).replace(/\"/g,'');
                let identity_traits = JSON.stringify(Meteor.users.findOne(this.userId).identity_traits).replace(/\"/g,'');

                let duplicated_partial_suggestions = [];
                let advanced_mixed_suggestions = [];
                let query_string = `suggest(${actual_plan_context}, ${goals}, ${contributions}, ${identity_traits}, Sugerencias_final, Sugerencias_mixtas_avanzadas).`;
                console.log(`Query String: ${query_string}`);
                const query = await engine.createQuery(query_string);
                try {
                    let result = await query.next();
                    console.log(`Prolog returned: ${JSON.stringify(result.Sugerencias_final)}`);
                    console.log(`Prolog returned (advanced): ${JSON.stringify(result.Sugerencias_mixtas_avanzadas)}`);
                    duplicated_partial_suggestions = fromRecursionToArray(result.Sugerencias_final);
                    advanced_mixed_suggestions = fromRecursionToArray(result.Sugerencias_mixtas_avanzadas);
                } finally {
                    await query.close();
                }
                engine.close();
                let final_ordered_suggestions = advanced_mixed_suggestions;
                final_ordered_suggestions.concat(sortByFrequency(duplicated_partial_suggestions));
                console.log(`Ordered Suggestions: ${JSON.stringify(final_ordered_suggestions)}`);
                resolve(final_ordered_suggestions);
            })().catch((err) => {
                console.error(err); 
                console.trace();
            });
        });
          
        return Promise.await(promise);
      }
    });
  
}