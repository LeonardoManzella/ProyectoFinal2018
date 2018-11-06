import { Meteor } from 'meteor/meteor';

const FROM_EMAIL = Meteor.settings.private.SENDGRID_FROM_EMAIL;
console.log(`SENDGRID_FROM_EMAIL: ${FROM_EMAIL}`);
const API_KEY = Meteor.settings.private.SENGRID_API_KEY;
console.log(`SENGRID_API_KEY: ${API_KEY}`);

if (Meteor.isServer) {
	import sendgrid from '@sendgrid/mail';
	sendgrid.setApiKey(API_KEY);
	
	Meteor.methods({
      'sendgrid.sendEmailRegister'( templateId, emailAddr, data ) {
		console.log("Callend Sendgrid to send email");
		let msg = {
			to: emailAddr, 
			from: FROM_EMAIL,
			replyTo: FROM_EMAIL,
			subject: "Testing Template. If you are seen this email, please contact us",
			text: "Testing Template. If you are seen this email, please contact us",
			html: '<strong>subject</strong>',
			templateId: templateId,
			dynamic_template_data: data,
			/*{
				name: name,
				email: emailAddr,
				plans: scheduled_tasks /*{
					communication_plan:[
						{
							"tool":"description",
							"responsible":"responsable",
							"supervisor":"supervisor" 
						},
						{
							"tool":"description2",
							"responsible":"responsable2",
							"supervisor":"supervisor2" 
						}
					],
					management_plan:[
						{
							"tool":"description",
							"responsible":"responsable",
							"supervisor":"supervisor" 
						},
						{
							"tool":"description2",
							"responsible":"responsable2",
							"supervisor":"supervisor2" 
						}
					],
					commercial_plan:[
						{
							"tool":"description",
							"responsible":"responsable",
							"supervisor":"supervisor" 
						},
						{
							"tool":"description2",
							"responsible":"responsable2",
							"supervisor":"supervisor2" 
						}
					]
				},
			},*/
		};
		sendgrid.send(msg);
		console.log( '========== MAIL SENT ==========' );
	}});
	
    Meteor.methods({
      'sendgrid.sendEmail'( templateId, emailAddr, subject, scheduled_tasks ) {
		console.log("Callend Sendgrid to send email");
		const msg = {
			to: emailAddr,
			from: FROM_EMAIL,
			replyTo: FROM_EMAIL,
			subject: subject,
			text: subject,
			html: '<strong>subject</strong>',
			templateId: templateId,
			dynamic_template_data: {
				subject: 'Testing Templates',
				name: 'Some One',
				city: 'Denver',
				plans: scheduled_tasks /*{
					communication_plan:[
						{
							"tool":"description",
							"responsible":"responsable",
							"supervisor":"supervisor" 
						},
						{
							"tool":"description2",
							"responsible":"responsable2",
							"supervisor":"supervisor2" 
						}
					],
					management_plan:[
						{
							"tool":"description",
							"responsible":"responsable",
							"supervisor":"supervisor" 
						},
						{
							"tool":"description2",
							"responsible":"responsable2",
							"supervisor":"supervisor2" 
						}
					],
					commercial_plan:[
						{
							"tool":"description",
							"responsible":"responsable",
							"supervisor":"supervisor" 
						},
						{
							"tool":"description2",
							"responsible":"responsable2",
							"supervisor":"supervisor2" 
						}
					]
				}*/,
			},
		};
		sendgrid.send(msg);
		console.log( '========== MAIL SENT ==========' );
	}
	});
}