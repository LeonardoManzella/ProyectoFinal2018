import { Meteor } from 'meteor/meteor';
import { Engine } from 'swipl-stdio';
import fs from 'fs';


if (Meteor.isServer) {
  
    Meteor.methods({
      'expert.consult'() {
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
                let actual_plan_context = "communication_plan";
                let replace_with_user_goals = ["wants_money", "wants_recognition"];
                let goals = JSON.stringify(replace_with_user_goals).replace(/\"/g,'');
                let replace_with_user_contributions = ["has_savings"];
                let contributions = JSON.stringify(replace_with_user_contributions).replace(/\"/g,'');
                let replace_with_user_identity_traits = ["disorganized", "shy_and_afraid", "non_social"];
                let identity_traits = JSON.stringify(replace_with_user_identity_traits).replace(/\"/g,'');

                let duplicated_partial_suggestions = [];
                let query_string = `suggest(${actual_plan_context}, ${goals}, ${contributions}, ${identity_traits}, Sugerencias_final).`;
                console.log(`Query String: ${query_string}`);
                const query = await engine.createQuery(query_string);
                try {
                    let result = await query.next();
                    console.log(`Prolog returned: ${JSON.stringify(result.Sugerencias_final)}`);
                    duplicated_partial_suggestions = fromRecursionToArray(result.Sugerencias_final);
                } finally {
                    await query.close();
                }
                engine.close();
                let final_ordered_suggestions = sortByFrequency(duplicated_partial_suggestions);
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