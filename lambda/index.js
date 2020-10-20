/* *
* This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
* Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
* session persistence, api calls, and more.
* */
const Alexa = require('ask-sdk-core');

const APP_NAME = "Template Seven";
const messages = {
  NOTIFY_MISSING_PERMISSIONS: 'Please enable profile permissions in the Amazon Alexa app.',
  ERROR: 'Uh Oh. Looks like something went wrong.'
};

const FULL_NAME_PERMISSION = "alexa::profile:name:read";
const EMAIL_PERMISSION = "alexa::profile:email:read";
const MOBILE_PERMISSION = "alexa::profile:mobile_number:read";

const astroGilda = '<lang xml:lang="pt-BR"> Astro Gilda </lang>'
const leaveMessage = 'Okay, Adeus. Estou indo, <break></break> <amazon:effect name="whispered"> não deixe as luzes acesas <break time="100ms"/>  quando sair </amazon:effect>'
let locale='en-US'
let dialogs = require('./dialog.json');
let myName = ""
// const astro_dialogs = require('./dialogs.js');
// const fs = require('fs');

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
	},
	async handle(handlerInput) {
		console.log("_________________________________________________________")
		
    	async function getName() {
            const { serviceClientFactory, responseBuilder } = handlerInput;
            try {
                const upsServiceClient = serviceClientFactory.getUpsServiceClient();
                const profileName = await upsServiceClient.getProfileName();
                const speechResponse = `Your name is, ${profileName}`;
                console.log("~~~~ prfile name" + profileName);
                return profileName
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        }
        
        myName = await getName();
		console.log("~~~~ myName" + myName);
		locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput = locale ==='en-US' ? "Hellow, "+myName+"  i am " : "olá, "+myName+" eu sou ";
		
		speakOutput += astroGilda;

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
	
	async handle(handlerInput) {
	  const { serviceClientFactory, responseBuilder } = handlerInput;
	  try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
    //   const profileName = await upsServiceClient.getProfileName();
    //   const speechResponse = `Your name is, ${profileName}`;
      const speechResponse = `Your name is,`;
      return handlerInput.responseBuilder
			.speak(speechResponse)
			.reprompt('Me diga. O que você quer. em?')
			.getResponse();
    } catch (error) {
      console.log("****** error" + JSON.stringify(error));
    }
	    
		const speakOutput = 'Olá, eu sou'+astroGilda+'Chamou?';
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		sessionAttributes.YouCalled = true;


		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt('Me diga. O que você quer. em?')
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

		let say = 'Até Onde eu Saiba: <break time="512ms"/>';

		let slotStatus = '';
		let resolvedSlot='';

		let slotValues = getSlotValues(request.intent.slots); 
		if (slotValues.AstroGildaPertguntaValor.heardAs && slotValues.AstroGildaPertguntaValor.heardAs !== '')
			resolvedSlot = slotValues.AstroGildaPertguntaValor.heardAs.toLowerCase();
		if (slotValues.PessoaNome.heardAs && slotValues.PessoaNome.heardAs !== '')
			resolvedSlot = slotValues.PessoaNome.heardAs.toLowerCase();

		if (resolvedSlot && resolvedSlot !== '') {
			slotStatus += ' Astro Gilda Pergunta escutou ' + resolvedSlot + '. ';
			sessionAttributes.YouCalled = true;
			slotStatus = JSON.stringify(dialogs[resolvedSlot]);
			if (JSON.stringify(dialogs[resolvedSlot])) {
				slotStatus = JSON.stringify(dialogs[resolvedSlot]["resposta"]);
			}

			if (typeof slotStatus === "undefined")
				slotStatus = 'O Que? fale novamente. Não entendi...'  + resolvedSlot;
			
		} else { 
				slotStatus = 'Meus Conhecimentos Sobre Isso Estão Vazios. ';

		}

		slotStatus+= "<break time=\"1000ms\"/> Algo Mais?"
		
		console.log("~~~~ slot.PessoaNome: " + JSON.stringify(slotValues.PessoaNome));
		console.log("~~~~ slot.PessoaNome.heardas: " + slotValues.PessoaNome.heardAs);
		console.log("~~~~ slot.PessoaNome.resolved: " + slotValues.PessoaNome.resolved);
		console.log("~~~~ slotValues.AstroGildaPertguntaValor.ERstatus " + slotValues.AstroGildaPertguntaValor.ERstatus);
		console.log("~~~~ slotValues.AstroGildaPertguntaValor.heardAs " + slotValues.AstroGildaPertguntaValor.heardAs);

		if (slotValues.AstroGildaPertguntaValor.ERstatus === 'ER_SUCCESS_NO_MATCH') {
			slotStatus = "Desculpe, não sei sobre isso. tente perguntar outra coisa. <break time=\"150ms\"/> ";
			slotStatus += 'tipo, ' + sayArray(getExampleSlotValues('AstroGildaResponde','AstroGildaPertguntaValor'), 'ou');
			console.log('***** consider adding "' + slotValues.AstroGildaPertguntaValor.heardAs + '" to the custom slot type used by slot AstroGildaPertguntaValor! '); 
		}

		say += slotStatus;

		console.log(`~~~~ handler response: ` + JSON.stringify(responseBuilder.getResponse()));
		
		return responseBuilder
			.speak(say)
			.reprompt('Mais perguntas?')
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
		let speakOutput = 'Não entendi direito. Pode repetir?';
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
	
		if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent') {

			speakOutput = sessionAttributes.YouCalled ? 'Então... Fala o que tu quer' : 'Sim, sobre o que? <break time="150ms"/> Cê ta bem?'
			sessionAttributes.YouCalled = !sessionAttributes.YouCalled;
			
		}

		if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent') {

			speakOutput = sessionAttributes.YouCalled ? "Então... "+leaveMessage : 'Não, sobre o quê? <break time="150ms"/> Cê ta bem?'
			if (sessionAttributes.YouCalled) {
				return handlerInput.responseBuilder
					.speak(speakOutput)
					.getResponse();
			}
			sessionAttributes.YouCalled = !sessionAttributes.YouCalled;
		}

		return handlerInput.responseBuilder
				.speak(speakOutput)
				.reprompt(speakOutput)
				.getResponse();

		
	}
};

const QuemEsTu = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuemEsTu';
	},
	handle(handlerInput) {
		const speakOutput = 'Eu sou Astro Gilda, respondendo suas perguntas, manda ver';
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		sessionAttributes.YouCalled=false;

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
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

const getUserId = (handlerInput) => {
	try {
		return handlerInput.requestEnvelope.context.System.user.userId;
	} catch (error) {
		console.log('Error occurred while getting user id:', error);
		throw error;
	}
};

const getPerson = (handlerInput) => {
	return handlerInput.requestEnvelope.context.System.person;
}
const getPersonId = (handlerInput) => {
	const person = getPerson(handlerInput);
	if (person) {
		return person.personId;
	}
}

function toPtBR (str) {
	return '<lang xml:lang="pt-BR">'+str+'</lang>';
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

function getExampleSlotValues(intentName, slotName) { 

	let examples = []; 
	let slotType = ''; 
	let slotValuesFull = []; 

	let intents = model.interactionModel.languageModel.intents; 
	for (let i = 0; i < intents.length; i++) { 
		if (intents[i].name === intentName) { 
			let slots = intents[i].slots; 
			for (let j = 0; j < slots.length; j++) { 
				if (slots[j].name === slotName) { 
					slotType = slots[j].type; 

				} 
			} 
		} 

	} 
	let types = model.interactionModel.languageModel.types; 
	for (let i = 0; i < types.length; i++) { 
		if (types[i].name === slotType) { 
			slotValuesFull = types[i].values; 
		} 
	} 
	
	slotValuesFull = shuffleArray(slotValuesFull); 

	examples.push(slotValuesFull[0].name.value); 
	examples.push(slotValuesFull[1].name.value); 
	if (slotValuesFull.length > 2) { 
		examples.push(slotValuesFull[2].name.value); 
	} 


	return examples; 
} 

function sayArray(myData, penultimateWord = 'and') { 
	let result = ''; 

	myData.forEach(function(element, index, arr) { 

		if (index === 0) { 
			result = element; 
		} else if (index === myData.length - 1) { 
			result += ` ${penultimateWord} ${element}`; 
		} else { 
			result += `, ${element}`; 
		} 
	}); 
	return result; 
} 

function shuffleArray(array) {  // Fisher Yates shuffle! 

	let currentIndex = array.length, temporaryValue, randomIndex; 

	while (0 !== currentIndex) { 

		randomIndex = Math.floor(Math.random() * currentIndex); 
		currentIndex -= 1; 

		temporaryValue = array[currentIndex]; 
		array[currentIndex] = array[randomIndex]; 
		array[randomIndex] = temporaryValue; 
	} 

	return array; 
} 


const HelpIntentHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		const speakOutput = 'Sai perguntando ai manolo?';

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
		const speakOutput = leaveMessage;

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
        const speakOutput = 'Desculpe, Meus conhecimentos não abrangem isso. Tente Outra Coisa.';

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
// /* *
// * The intent reflector is used for interaction model testing and debugging.
// * It will simply repeat the intent the user said. You can create custom handlers for your intents 
// * by defining them above, then also adding them to the request handler chain below 
// * */
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
		const speakOutput = 'Desculpe, não consegui fazer isso. tente novamente';
		console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt(speakOutput)
			.getResponse();
	}
};

const myRequestInterceptor = {
	process(handlerInput) {
		// console.log(`~~~~ Request Interceptor ${JSON.stringify(handlerInput.requestEnvelope)}`);
	}
}

const myResponseInterceptor = {
	process(handlerInput) {
		// console.log(`~~~~ Response Interceptor`);
	}
}

const ResponseRecordSpeechOutputInterceptor = { 
	process(handlerInput, responseOutput) { 

		if ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' || Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest')
		&& (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
				|| Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent') ) {
			
			console.log(`~~~~ Session ended OutPut.Request ${JSON.stringify(handlerInput.requestEnvelope)}`);
			
		} else if (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'  
			&& (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChameAstrogilda' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AstroGildaResponde')) {

			let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
			let lastSpeechOutput = { 
				"outputSpeech":responseOutput.outputSpeech.ssml, 
				"reprompt":responseOutput.reprompt.outputSpeech.ssml 
			}; 
			
			console.log(`~~~~ responseOutput ${JSON.stringify(responseOutput)}`);
			console.log(`~~~~ RequestEnvelope ${JSON.stringify(handlerInput.requestEnvelope)}`);
			console.log(`~~~~ RequestEnvelope.Request ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
// 			console.log(`~~~~ handlerInput ${JSON.stringify(handlerInput)}`);
			console.log(`~~~~ responseBuilder.getresponse: ` + JSON.stringify(handlerInput.responseBuilder.getResponse()));
 			// console.log(`~~~~ handler responseBuilder.context: ` + JSON.stringify(handlerInput.requestEnvelope.context));
 			console.log(`~~~~ responseBuilder.context.system: ` + JSON.stringify(handlerInput.requestEnvelope.context.System));

			sessionAttributes['lastSpeechOutput'] = lastSpeechOutput; 
	
			handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
		}

	} 
}; 

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
  const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
		AstroGildaResponde,
		QuemEsTu,
 		ChameAstrogilda,
		YesNoIntentHandler,
		HelpIntentHandler,
		CancelAndStopIntentHandler,
		FallbackIntentHandler,
		SessionEndedRequestHandler,
		IntentReflectorHandler)
	.addRequestInterceptors(myRequestInterceptor)
	.addResponseInterceptors(myResponseInterceptor)
	.addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)
	.addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
  




	const model = {
		"interactionModel": {
		"languageModel": {
			"invocationName": "astro gilda",
			"intents": [
			{
				"name": "AMAZON.CancelIntent",
				"samples": []
			},
			{
				"name": "AMAZON.HelpIntent",
				"samples": []
			},
			{
				"name": "AMAZON.StopIntent",
				"samples": []
			},
			{
				"name": "ChameAstrogilda",
				"slots": [],
				"samples": [
				"hello",
				"hi",
				"hello astro gilda",
				"astro gilda",
				"hi astro gilda"
				]
			},
			{
				"name": "AMAZON.NavigateHomeIntent",
				"samples": []
			},
			{
				"name": "AstroGildaResponde",
				"slots": [
				{
					"name": "AstroGildaPertguntaValor",
					"type": "AstroGildaPerguntaValor"
				}
				],
				"samples": [
				"{AstroGildaPertguntaValor}",
				"Grande Oraculo {AstroGildaPertguntaValor}",
				"Astro Gilda {AstroGildaPertguntaValor}",
				"Responda {AstroGildaPertguntaValor}"
				]
			},
			{
				"name": "QuemEsTu",
				"slots": [],
				"samples": [
				"astro who",
				"are you real"
				]
			},
			{
				"name": "AMAZON.YesIntent",
				"samples": []
			},
			{
				"name": "AMAZON.NoIntent",
				"samples": []
			},
			{
				"name": "LaunchRequest"
			}
			],
			"types": [
			{
				"name": "AstroGildaPerguntaValor",
				"values": [
					{
						"name": {
							"value": "me fale sobre o mestre"
						}
					},
					{
						"name": {
							"value": "quem é o mestre"
						}
					},
					{
						"name": {
							"value": "quem é astro gilda"
						}
					},
					{
						"name": {
							"value": "quem é pollyanna"
						}
					},
					{
						"name": {
							"value": "quem é polyana"
						}
					},
					{
						"name": {
							"value": "quem é juliana"
						}
					},
					{
						"name": {
							"value": "quem é shaiana"
						}
					},
					{
						"name": {
							"value": "quem é beca"
						}
					},
					{
						"name": {
							"value": "quem é roxy"
						}
					},
					{
						"name": {
							"value": "quem é porta"
						}
					},
					{
						"name": {
							"value": "quem é vitinho"
						}
					},
					{
						"name": {
							"value": "quem é astrogilda"
						}
					},
					{
						"name": {
							"value": "me fale alguma coisa"
						}
					},
					{
						"name": {
							"value": "me diga alguma coisa"
						}
					},
					{
						"name": {
							"value": "quem é o mestre"
						}
					},
					{
						"name": {
							"value": "me fale sobre o mestre"
						}
					},
					{
						"name": {
							"value": "o que é voce"
						}
					},
					{
						"name": {
							"value": "teste sem resposta"
						}
					}
				]
			}
			]
		}
		}
	};
	