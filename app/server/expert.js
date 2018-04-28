import { Meteor } from 'meteor/meteor';
import { Engine } from 'swipl-stdio';
import fs from 'fs';


if (Meteor.isServer) {
  
    Meteor.methods({
      'expert.consult'() {
        const engine = new Engine();

        const absolutePath = Assets.absoluteFilePath('prologFiles/expertRules.pl');
        engine.call("consult('" + absolutePath + "')");
        
        let promise = new Promise((resolve) => {
            (async () => {
                let results = [];
                const query = await engine.createQuery('tieneQuePagarIVA(X).');
                try {
                    let result;
                    while (result = await query.next()) {
                        results.push(result.X);
                        console.log(`${result.X} tiene que pagar IVA`);
                    }
                } finally {
                    await query.close();
                }
                engine.close();
                resolve(results);
            })().catch((err) => console.log(err));
        });
          
        return Promise.await(promise);
      }
    });
  
}