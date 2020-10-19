/* *
* This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
* Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
* session persistence, api calls, and more.
* */
const Alexa = require('ask-sdk-core');

const astroGilda = '<lang xml:lang="pt-BR"> Astro Gilda </lang>'
const leaveMessage = 'Okay, Bye. I\'m Leaving, <break></break> <amazon:effect name="whispered"> dont let the lighs on <break time="100ms"/>  when you leave </amazon:effect>'
let locale='en-US'
const astro_dialogs = require('./dialogs.js');
let dialogs = require('./dialog.json');

const fs = require('fs');



const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
	},
	handle(handlerInput) {
		locale = handlerInput.requestEnvelope.request.locale;

		
		let speakOutput = locale ==='en-US' ? "Hellow,  i am " : "olá, eu sou ";
// 		let spoken_special = JSON.parse(JSON.stringify(astro_dialogs.getDailySpecialForPeriod('sunday', 'lunch')));
// 		let atribute = JSON.parse(JSON.stringify(astro_dialogs.getAtributeFromJson('sunday')));
  		dialogs = JSON.stringify(dialogs);
// 		console.log("^^^^ - spoken_special stringfy: " + JSON.stringify(spoken_special));
// 		console.log("^^^^ getAtributeFromJson: " + JSON.stringify(atribute));
// 		console.log("^^^^ - no let stringfy: " + JSON.stringify(JSON.parse(JSON.stringify(astro_dialogs.getDailySpecialForPeriod('sunday', 'lunch')))));
		console.log("^^^^ stringfy.pack: " + dialogs.types);
		console.log("^^^^ stringfy dialogs.types: " + JSON.stringify(dialogs.types));
		console.log("^^^^ dialogs: " + dialogs);
		console.log("^^^^ dialogs.sunday: " + JSON.parse(JSON.stringify(dialogs.sunday)));
		console.log("^^^^ dialogs.sunday: " + JSON.stringify(JSON.parse(JSON.stringify(dialogs.sunday))));
// 		console.log("^^^^ dialogs.sunday.salad: " + dialogs.sunday.salad);
		
// 		let rawdata = fs.readFileSync('./log.json');
//         let student = JSON.parse(rawdata);
//         console.log("^^^^ FS READ DIALOG: " + JSON.stringify(student));

		
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
	handle(handlerInput) {
		const speakOutput = 'Hellow, i\'m'+astroGilda+'you called?';

		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		sessionAttributes.YouCalled = true;


		return handlerInput.responseBuilder
			.speak(speakOutput)
			.reprompt('Tell me. What do you want. will ya?')
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

		let say = 'Here It is: <break time="1s"/>';

		let slotStatus = '';
		let resolvedSlot;

		let slotValues = getSlotValues(request.intent.slots); 
		resolvedSlot = slotValues.AstroGildaPertguntaValor.heardAs.toLowerCase();
		// getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions
		// console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
		// console.log('resolvedSlot: ' + resolvedSlot);
		//   SLOT: AstroGildaPertguntaValor 
		if (resolvedSlot && resolvedSlot !== '') {
			slotStatus += ' slot AstroGildaPertguntaValor was heard as ' + resolvedSlot + '. ';
			sessionAttributes.YouCalled = true;
					
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
					
				case 'who is pollyanna':
					slotStatus = 'Pollyanna. She is the all might princess of darkness. All Hail Pollyanna, metal Knight.'
					break;

				case 'who is juliana':
					slotStatus = 'Juliana hates cold. And Loves it when is hot. <break time="150ms"/>  She\'s a smart person'
					break;

				case 'who is hoshi':
					slotStatus = 'About hoshi. She\'s a bright star that illuminates my dark nights'
					break;

				case 'who is shayana':
					slotStatus = 'Oh, Chayana, what can i say. All that she can think of: is crossfit <break time="500ms"/> crossfit this. crossfit that '+
						'<break time="1000ms"/> but she\'s also a star wars fan. So she\'s cool'
					break;

				case 'who is becca':
					slotStatus = 'Well: Becca is the cuttest around, <break time="250ms"/> but no one deserves to be around her by the mornings...'+
						'What kind of person Wakes up singing? <break time="500ms"/> Becca! i guess? But After all she\'s nice, i wanna bear-hug her'
					break;

				case 'what are you':
					slotStatus = 'What is for objects <break time="500ms"/> you <say-as interpret-as="expletive">[stuuuuuupid]</say-as>'
					break;

				case 'me diga alguma coisa':
					say='';
					slotStatus = '<lang xml:lang="pt-BR">Se eu disser que não direi nada, então ja disse alguma coisa.</lang>'
					break;

				case 'quem e o mestre':
					say='';
					slotStatus = toPtBR('Não posso falar sobre o mestre')
					break;

				case 'Porta':
					say='';
					slotStatus = toPtBR('Conheço alguns tipos de porta')
					break;

				case 'vitinho':
					say='';
					slotStatus = toPtBR('hummmm. hehe')
					break;

				case 'me fale sobre o mestre':
					slotStatus = toPtBR('O mestre? <amazon:effect name="whispered"> desculpe, não posso comentar </amazon:effect>')
					break;

				default:
				console.log(`Sorry, we are out of ${resolvedSlot}.`);
				slotStatus = 'What? say it again.'  + resolvedSlot;
			}
			
		} else {
			slotStatus = 'My knolege about that is empty. ';

		}

		slotStatus+= "<break time=\"500ms\"/> Anything Else?"
		

		if (slotValues.AstroGildaPertguntaValor.ERstatus === 'ER_SUCCESS_NO_MATCH') {
			slotStatus = "Sorry, don't know about that. Try asking another thing. <break time=\"150ms\"/> ";
			console.log('***** consider adding "' + slotValues.AstroGildaPertguntaValor.heardAs + '" to the custom slot type used by slot AstroGildaPertguntaValor! '); 
		}

		if( (slotValues.AstroGildaPertguntaValor.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.AstroGildaPertguntaValor.heardAs) ) {
		    slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('AstroGildaResponde','AstroGildaPertguntaValor'), 'or');
		}

		say += slotStatus;

		console.log(`handler response: ` + JSON.stringify(responseBuilder.getResponse()));
		
		return responseBuilder
			.speak(say)
			.reprompt('Any More Questions?')
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

			speakOutput = sessionAttributes.YouCalled ? 'So... say what you wanna know' : 'yes what? <break time="150ms"/> are You Okay?'
			sessionAttributes.YouCalled = !sessionAttributes.YouCalled;
			
		}

		if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent') {

			speakOutput = sessionAttributes.YouCalled ? "So... "+leaveMessage : 'No what? <break time="150ms"/> are You Okay?'
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
		const speakOutput = 'I am Astro Gilda, answering your questions, hit me';
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
		// console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
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

const myRequestInterceptor = {
	process(handlerInput) {
		// console.log(`~~~~ Request Interceptor ${JSON.stringify(handlerInput.requestEnvelope)}`);
	}
}

const myResponseInterceptor = {
	process(handlerInput) {
		console.log(`~~~~ Response Interceptor`);
	}
}

const ResponseRecordSpeechOutputInterceptor = { 
    process(handlerInput, responseOutput) { 

        if (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' || Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
           && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
				|| Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent') ) {
	        
	        console.log(`~~~~ Session ended OutPut.Request ${JSON.stringify(handlerInput.requestEnvelope)}`);
	        
		} else {
 
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
            let lastSpeechOutput = { 
                "outputSpeech":responseOutput.outputSpeech.ssml, 
                "reprompt":responseOutput.reprompt.outputSpeech.ssml 
            }; 
    		
    		console.log(`~~~~ responseOutput ${JSON.stringify(responseOutput)}`);
    		console.log(`~~~~ OutPut.Request ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    		console.log(`~~~~ OutPut.Request.locale ${JSON.stringify(handlerInput.requestEnvelope.request.locale)}`);
    		console.log(`~~~~ let locale ${locale}`);
    
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
	.addRequestInterceptors(myRequestInterceptor)
	.addResponseInterceptors(myResponseInterceptor)
	.addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)
	.addErrorHandlers(
		ErrorHandler)
	.withCustomUserAgent('sample/hello-world/v1.2')
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
					  "value": "tell me about the master"
					}
				  },
				  {
					"name": {
					  "value": "who is the master"
					}
				  },
				  {
					"name": {
					  "value": "who are you"
					}
				  },
				  {
					"name": {
					  "value": "who is astro gilda"
					}
				  },
				  {
					"name": {
					  "value": "who is astrogilda"
					}
				  },
				  {
					"name": {
					  "value": "tell me something"
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
				  }
				]
			  }
			]
		  }
		}
	  };
	  