import { UserTasks } from '/lib/schemas/userTask';

Meteor.startup(function () {
    if (Meteor.isServer) {
        //console.log("Called startup");
        var schedule = require('node-schedule');
        //console.log("Required");

        var rule = new schedule.RecurrenceRule();
        //rule.second = 42;
        rule.minute = 0;
        rule.hour = 8;
        console.log("Rule setted");
        var fiber_function = Meteor.bindEnvironment( 
            function(){
                const TEMPLATE_BASICO = 'd-c1b69f6b24314f52ae5082044027b0dd';
                const TEMPLATE_PLANES = 'd-9b01a2e5ae3b4f8aa351faa4da11a061';

                
                var tasks = Promise.await(UserTasks.obtainScheduledTasks());
                console.log("=== Tasks Scheduled ===");
                console.log(JSON.stringify(tasks));

                Object.entries(tasks).forEach( ([email, plan]) => {
                    // console.log("== Entry ==");
                    // console.log(email);
                    // console.log(plan);
                    // Meteor.call('sendgrid.sendEmail', TEMPLATE_PLANES, 'leonardo.manzella+prueba@gmail.com', "Automatic Maintenance Email", plan, (error, data) => {
                    // TODO Uncoment to send emails
                    //  Meteor.call('sendgrid.sendEmail', TEMPLATE_PLANES, email, "Buenas! Te envio tus Tareas", plan, (error, data) => {
                    // console.log("Called send email");
                    // if(error) {
                    //     console.error("==== ERROR ===");
                    //     console.error(error);
                    //     console.error("==== TRACE ===");
                    //     console.trace();
                    // }
                    // });
                }, this);
            }
        );


        var scheduled_job = schedule.scheduleJob(rule, fiber_function);
        console.log("Emails Cron Job scheduled!");
    }
});