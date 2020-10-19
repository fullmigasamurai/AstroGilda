'use strict';

const astro_dialogs = {
	sunday : {
	lunch : {
		pizza : {
		size: "small", 
		crust: "thin crust",
		cheese : "extra", 
		toppingsList : ["pineapple", "canadian bacon"]
		},
		salad : "small caesar salad",
		drinks : "large iced tea",
		cost : 10.99
	},
	dinner : {
		pizza : {
		size: "extra large", 
		crust: "deep dish",
		cheese : "normal", 
		toppingsList : ["ham", "pepperoni", "sausage", "black olives"]
		},
		salad : "large house salad",
		drinks : "2 liter coke",
		side : "cheesy garlic bread",
		dessert : "two homemade chocolate fudge cookies",
		cost : 21.99
	}
	},
	monday : {
	lunch : {
		pizza : {
		size: "small", 
		crust: "regular",
		cheese : "extra", 
		toppingsList : ["pepperoni", "olives"]
		},
		salad : "small house salad",
		drinks : "diet coke",
		cost : 10.99
	},
	dinner : {
		pizza : {
		size: "large", 
		crust: "regular",
		cheese : "extra", 
		toppingsList : ["kalamata olives", "artichoke hearts", "feta cheese"]
		},
		salad : "large caesar salad",
		drinks: "2 liter sprite",
		side: "parmesean bread bites",
		dessert: "a family size fudge brownie",
		cost : 14.99
	}
	},
	tuesday : {
	lunch : {
		pizza : {
		size: "medium", 
		crust: "brooklyn style",
		cheese : "regular", 
		toppingsList : ["pepperoni"]
		},
		salad : "small caesar salad",
		drinks : "sprite",
		cost : 11.99
	},
	dinner : {
		pizza : {
		size: "extra large", 
		crust: "brooklyn style",
		cheese : "normal", 
		toppingsList : ["tomato", "basil", "ricotta cheese"]
		},
		salad : "small house salad",
		drinks: "one liter San Pelligrino",
		dessert: "chocolate dipped strawberries",
		side: "basil garlic toast",
		cost : 14.99
	}
	},
	wednesday : {
	lunch : {
		pizza : {
		size: "small", 
		crust: "thin",
		cheese : "normal", 
		toppingsList : ["parmesean flakes", "olive oil"]
		},
		salad : "small caesar salad",
		drinks : "large iced tea",
		cost : 10.99
	},
	dinner : {
		pizza : {
		size: "large", 
		crust: "thin",
		cheese : "light", 
		toppingsList : ["chicken", "spinach", "mushroom"]
		},
		salad : "large caesar salad",
		drinks : "2 liter diet coke",
		dessert : "a box of pocky sticks",
		side : "garlic bread sticks",
		cost : 19.99
	}
	},
	thursday : {
	lunch : {
		pizza : {
		size: "small", 
		crust: "regular",
		cheese : "extra", 
		toppingsList : ["bacon", "canadian bacon", "sausage"]
		},
		salad : "small house salad",
		drinks : "diet coke",
		cost : 9.99
	},
	dinner : {
		pizza : {
		size: "extra large", 
		crust: "regular",
		cheese : "light", 
		toppingsList : ["tomato", "onion", "garlic"]
		},
		salad : "small house salad",
		side: "olive tapenade and fresh sliced bread",
		drinks: "a two liter sprite",
		dessert : "small apple pie",
		cost : 18.99
	}
	},
	friday : {
	lunch : {
		pizza : {
		size: "medium", 
		crust: "regular",
		cheese : "light", 
		toppingsList : ["sausage", "onion", "sweet peppers"]
		},
		salad : "small caesar salad",
		drinks: "iced tea",
		cost : 10.99
	},
	dinner : {
		pizza : {
		size: "extra large", 
		crust: "deep dish",
		cheese : "normal", 
		toppingsList : ["ham", "pepperoni", "sausage", "black olives"]
		},
		salad : "large house salad",
		drinks : "2 liter coke",
		side : "ranch cheesy bites with dipping sauce",
		dessert : "a truffle brownie",
		cost : 22.99
	}
	},
	saturday : {
	lunch : {
		pizza : {
		size: "small", 
		crust: "brooklyn style",
		cheese : "extra", 
		toppingsList : ["tomato", "basil"]
		},
		salad : "small house salad",
		drinks : "large iced tea",
		cost : 10.99
	},
	dinner : {
		pizza : {
		size: "extra large", 
		crust: "thin",
		cheese : "normal", 
		toppingsList : ["pineapple", "canadian bacon"]
		},
		salad : "large house salad",
		drinks: "two, two liter cokes",
		dessert: "homemade raspberry pie",
		side : "ranch cheesy bites with dipping sauce",
		cost : 18.99
	}
	},
};

const getDailySpecialForPeriod = (day, period) => {
	return astro_dialogs[day][period];
};

const getAtributeFromJson = (day) => {
	return astro_dialogs[day];
};

const makeSpeakableList =  (list) => {
	if (list.length > 1){
	let last = " and " + list.pop();
	return list.join(", ") + last;
	}
	return list;
	
}