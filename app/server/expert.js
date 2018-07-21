import { Meteor } from 'meteor/meteor';
import { Engine } from 'swipl-stdio';
import fs from 'fs';


if (Meteor.isServer) {
  
    Meteor.methods({
      'expert.consult'() {
        const engine = new Engine();

        const absolutePath = Assets.absoluteFilePath('prologFiles/expert_system_algorithm.pl');
        engine.call("consult('" + absolutePath + "')");
        
        let promise = new Promise((resolve) => {
            (async () => {
                let suggestions = [];
                const query = await engine.createQuery('suggest(communication_plan, [quiere_plata, quiere_reconocimiento], [has_savings], [desorganizado], Sugerencias_final).');
                try {
                    let result = await query.next();
                    console.log(`Prolog returned: ${JSON.stringify(result.Sugerencias_final)}`);
                    let recursionArray = result.Sugerencias_final;
                    while (recursionArray.head ) {
                        suggestions.push(recursionArray.head);
                        console.log(`Added ${recursionArray.head} suggestion`);
                        recursionArray = recursionArray.tail;
                    }
                } finally {
                    await query.close();
                }
                engine.close();
                resolve(suggestions);
            })().catch((err) => console.log(err));
        });
          
        return Promise.await(promise);
      }
    });
  
}