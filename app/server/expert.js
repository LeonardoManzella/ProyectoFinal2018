import { Meteor } from 'meteor/meteor';
import { Engine } from 'swipl-stdio';
import fs from 'fs';


if (Meteor.isServer) {
  
    Meteor.methods({
      'expert.consult'() {
        function sortByFrequency(array) {
            var frequency = {};

            array.forEach(function(value) { frequency[value] = 0; });

            var uniques = array.filter(function(value) {
                return ++frequency[value] == 1;
            });

            return uniques.sort(function(anElement, anotherElement) {
                return frequency[anotherElement] - frequency[anElement];
            });
        }

        function fromRecursionToArray(recursion) {
            var array = [];

            while (recursion.head ) { //Breaks recursion using head,tail decomposition
                array.push(recursion.head);
                console.log(`Added ${recursion.head} suggestion`);
                recursion = recursion.tail;
            }
            return array;
        }

        const engine = new Engine();

        const absolutePath = Assets.absoluteFilePath('prologFiles/expert_system_algorithm.pl');
        engine.call("consult('" + absolutePath + "')");
        

        let promise = new Promise((resolve) => {
            (async () => {
                let duplicated_partial_suggestions = [];
                const query = await engine.createQuery('suggest(communication_plan, [wants_money, wants_recognition], [has_savings], [disorganized, shy_and_afraid, non_social], Sugerencias_final).');
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