Meteor.startup(function () {
    //console.log("Called startup");
    var schedule = require('node-schedule');
    //console.log("Required");

    var rule = new schedule.RecurrenceRule();
    rule.second = 42;
    // rule.minute = 0;
    // rule.hour = 8;
    console.log("Rule setted");

    var j = schedule.scheduleJob(rule, function(){
        console.log('The answer to life, the universe, and everything!');
    });
    console.log("Email Job scheduled!");

});