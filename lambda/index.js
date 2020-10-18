/* *
* This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
* Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
* session persistence, api calls, and more.
* */
const Alexa = require('ask-sdk-core');

const astroGilda = '<lang xml:lang="pt-BR"> Astro Gilda </lang>'

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speakOutput = 'Hellow, i am' + astroGilda;

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput + 'U Need me?')
			.getResponse();
	}
};

const ChameAstrogilda = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChameAstrogilda';
	},
	handle(handlerInput) {
		const speakOutput = 'Hellow, i\'m'+astroGilda+'you called?';



		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt('Tell me. What do you want.')
			.getResponse();
	}
};

const AstroGildaResponde =  {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'AstroGildaResponde' ;
	},
	handle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const responseBuilder = handlerInput.responseBuilder;
		let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

		let say = 'You Called <break time="500ms"/>' +astroGilda+'will Answer: <break time="1s"/>';

		let slotStatus = '';
		let resolvedSlot;

		let slotValues = getSlotValues(request.intent.slots); 
		// getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions
		
		resolvedSlot = slotValues.AstroGildaPertguntaValor.heardAs.toLowerCase();
		console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
		console.log('resolvedSlot' + resolvedSlot);
		//   SLOT: AstroGildaPertguntaValor 
		if (resolvedSlot && resolvedSlot !== '') {
			slotStatus += ' slot AstroGildaPertguntaValor was heard as ' + resolvedSlot + '. ';
					
			switch (resolvedSlot) {
				case 'who is the master':
					slotStatus = 'I Cant talk about the master';

					break;

				case 'tell me something':
					slotStatus = 'And if i dont wanna?... what are you gonna do?';

					break;

				case 'who is astro gilda':
					slotStatus = 'I\'m the good. the bad. and the <break time="100ms"/> ugly';

					break;

				case 'who is astrogilda':
					slotStatus = 'I\'m the good. the bad.. and the <break time="100ms"/> ugly';

					break;
				
				case 'tell me about the master':
					slotStatus = 'The master? <amazon:effect name="whispered"> sorry, cant say anything </amazon:effect>';

					break;

				case 'who are you':
					slotStatus = 'I am <prosody volume="loud"> Astro Gilda </prosody>  <emphasis level="moderate"> of course. </emphasis>'
					break;
				case 'what are you':
					slotStatus = 'What is for objects <break time="500ms"/> you <say-as interpret-as="expletive">[stuuuuuupid]</say-as>'
					break;
				default:
				console.log(`Sorry, we are out of ${resolvedSlot}.`);
			}
			
		} else {
			slotStatus += 'slot AstroGildaPertguntaValor is empty. ';
		}
		// if (slotValues.AstroGildaPertguntaValor.ERstatus === 'ER_SUCCESS_MATCH') {
		//     slotStatus += 'a valid ';
		//     if(slotValues.AstroGildaPertguntaValor.resolved !== slotValues.AstroGildaPertguntaValor.heardAs) {
		//         slotStatus += 'synonym for ' + slotValues.AstroGildaPertguntaValor.resolved + '. '; 
		//         } else {
		//         slotStatus += 'match. '
		//     } // else {
		//         //
		// }
		if (slotValues.AstroGildaPertguntaValor.ERstatus === 'ER_SUCCESS_NO_MATCH') {
			slotStatus += 'which did not match any slot value. ';
			console.log('***** consider adding "' + slotValues.AstroGildaPertguntaValor.heardAs + '" to the custom slot type used by slot AstroGildaPertguntaValor! '); 
		}

		if( (slotValues.AstroGildaPertguntaValor.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.AstroGildaPertguntaValor.heardAs) ) {
		// slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('AstroGildaResponde','AstroGildaPertguntaValor'), 'or');
		}

		say += slotStatus;


		return responseBuilder
			.speak(say)
			.reprompt('try again, ' + say)
			.getResponse();
	},
};

const YesNoIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' 
				|| Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent');
	},
	handle(handlerInput) {
		let speakOutput = 'Didnt quiet get that, say again?';
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
	
		if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent') {
			speakOutput = 'So... say what you wanna know'
			return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse();
			
		}
		if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent') {
			speakOutput = 'So... Okay, Bye. I\'m Leaving, <break></break>' +
			'<amazon:effect name="whispered"> dont let the lighs on <break time="50ms"/>  when you leave </amazon:effect>'
			return handlerInput.responseBuilder
			.speak(speakOutput)
			.getResponse();
		}

		
	}
};

const QuemEsTu = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuemEsTu';
	},
	handle(handlerInput) {
		const speakOutput = 'I am Astro Gilda, answering your questions, hit me';

		return handlerInput.responseBuilder
			.speak(speakOutput)
			//.reprompt('add a reprompt if you want to keep the session open for the user to respond')
			.getResponse();
	}
};

function capitalize(myString) {

	return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}


function randomElement(myArray) { 
	return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 

function stripSpeak(str) { 
	return(str.replace('<speak>', '').replace('</speak>', '')); 
} 


function getSlotValues(filledSlots) { 
	const slotValues = {}; 

	Object.keys(filledSlots).forEach((item) => { 
		const name  = filledSlots[item].name; 

		if (filledSlots[item] && 
			filledSlots[item].resolutions && 
			filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
			filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
			filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
			switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
				case 'ER_SUCCESS_MATCH': 
					slotValues[name] = { 
						heardAs: filledSlots[item].value, 
						resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
						ERstatus: 'ER_SUCCESS_MATCH' 
					}; 
					break; 
				case 'ER_SUCCESS_NO_MATCH': 
					slotValues[name] = { 
						heardAs: filledSlots[item].value, 
						resolved: '', 
						ERstatus: 'ER_SUCCESS_NO_MATCH' 
					}; 
					break; 
				default: 
					break; 
			} 
		} else { 
			slotValues[name] = { 
				heardAs: filledSlots[item].value || '', // may be null 
				resolved: '', 
				ERstatus: '' 
			}; 
		} 
	}, this); 

	return slotValues; 
} 


const HelpIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		const speakOutput = 'You can say hello to me! How can I help?';

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse();
	}
};

const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
				|| Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		const speakOutput = 'Goodbye!';

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.getResponse();
	}
};
/* *
* FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
* It must also be defined in the language model (if the locale supports it)
* This handler can be safely added but will be ingnored in locales that do not support it yet 
* */
const FallbackIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
	},
	handle(handlerInput) {
		const speakOutput = 'Sorry, Didn\'t quiet get that, say it again? pleease';

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse();
	}
};
/* *
* SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
* session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
* respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
* */
const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
		// Any cleanup logic goes here.
		return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
	}
};
/* *
* The intent reflector is used for interaction model testing and debugging.
* It will simply repeat the intent the user said. You can create custom handlers for your intents 
* by defining them above, then also adding them to the request handler chain below 
* */
const IntentReflectorHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
	},
	handle(handlerInput) {
		const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
		const speakOutput = `You just triggered ${intentName}`;

		return handlerInput.responseBuilder
			.speak(speakOutput)
			//.reprompt('add a reprompt if you want to keep the session open for the user to respond')
			.getResponse();
	}
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
		console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse();
	}
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequestHandler,
		ChameAstrogilda,
		AstroGildaResponde,
		QuemEsTu,
		YesNoIntentHandler,
		HelpIntentHandler,
		CancelAndStopIntentHandler,
		FallbackIntentHandler,
		SessionEndedRequestHandler,
		IntentReflectorHandler)
	.addErrorHandlers(
		ErrorHandler)
	.withCustomUserAgent('sample/hello-world/v1.2')
	.lambda();