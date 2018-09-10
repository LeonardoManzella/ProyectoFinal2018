// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//const sgMail = require('@sendgrid/mail');
//TODO Change later to ENV using:
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env

// Leyendo https://forums.meteor.com/t/sendgrid-examples/19965/4, me parece que hay que rehacerlo para usar una meteor call
// sgMail.setApiKey('TODO API KEY');
// const msg = {
//   to: 'leonardo.manzella@gmail.com',
//   from: 'leonardo.manzella@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
import { Meteor } from 'meteor/meteor';

const FROM_EMAIL = 'leonardo.manzella@gmail.com'; //TODO move to settings json

if (Meteor.isServer) {
	//var sendgrid = Meteor.npmRequire( '@sendgrid/client' )( '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');
	import sendgrid from '@sendgrid/mail';
	console.log(sendgrid);
	sendgrid.setApiKey('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');
	
    Meteor.methods({
      'sendgrid.sendEmail'( templateId, emailAddr, subject, bodyVar, otherVars ) {
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
				plans:{
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
			},
		};
		sendgrid.send(msg);
		console.log( '========== MAIL SENT ==========' );
		
		/*
		let email = new sendgrid.Email( {
			to: emailAddr,
			from: 'leonardo.manzella@gmail.com',  //TODO change this
			subject: subject,
			html: bodyVar, // <%body%> tag for text, required 
			text: '' // <%body%> tag for html
		} );

		email.setFromName('leonardo.manzella@gmail.com');  // Optional
		console.log("Name Set");
		// Merge variables in template if any 
		_.each( otherVars, function ( el ) {
			for( key in el ) {
				if( el.hasOwnProperty( key ) ) {
					var value = el[ key ];
					email.addSubstitution( key, value );
				}
			}
		} );

		console.log("Merged Variables");
		// https://sendgrid.com/docs/API_Reference/SMTP_API/apps.html#template
		email.addFilter( 'templates', 'template_id', templateId );

		cconsole.log("Template selected");
		sendgrid.send( email, function ( err, response ) {
			if( err ) {
				return console.error( err );
			}
			console.log( response ); // Success message
		console.log( '========== MAIL SENT ==========' );
	} );
	*/
	}
	});
}