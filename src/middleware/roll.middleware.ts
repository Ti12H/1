import { requestDiceRoll, DICE_ROLL_REQUESTED, diceRolled } from '../actions/roll.actions';
import { D6_CONAN } from '../consts/conanConstants';
import getResultsArray from '../utils/getResultsArray';

function resultsSorter(a:number, b:number) {
	return a - b;
}

interface rollDiceProps {
	diceType: number;
	modifier?: number;
	diceAmount?: number;
	rollOptions: any;
	itemsToStay?: Array<number>;
}

interface rollDiceResult {
	results: Array<number>;
	diceAmount: number;
	diceType: number;
	diceTypeNum?: number;

	modifier: number;
	modSymbol: string;

	totalWithModifier: number;
	totalWithoutModifier: number;

	highest: number;
	lowest: number;

	// CoC results
	cocBonusResult?: number | undefined;
	cocPenaltyResult?: number | undefined;
	cocBonus?: boolean;
	cocPenalty?: boolean;
	cocTwoBonus?: boolean;
	cocTwoPenalty?: boolean;
	skillLevel?: number | undefined;

	// Conan results
	effects?: number | undefined;
	dmg?: number | undefined;
	assistanceDiceResults?: Array<number>;
}


const roll = (store:any) => (next:any) => (action:any) => {
	if (action.type === DICE_ROLL_REQUESTED) {
		console.log('DICE_ROLL_REQUESTED', action.payload);
		let {
			modifier = 0,
			diceAmount = 1,
			rollOptions = {},
			itemsToStay = []
		} = action.payload;
		const {
			diceTypeNum = 6,
			cocMode,
			cocBonus,
			cocTwoBonus,
			cocPenalty,
			cocTwoPenalty,
			skillLevel,
			fortune
		} = rollOptions;
		const isCombatDie = rollOptions.diceTypeRaw === D6_CONAN;
		const keepUnits = (cocBonus || cocTwoBonus || cocPenalty || cocTwoPenalty);
		const result = {} as rollDiceResult;
		const fortuneNum = Number(fortune);

		if (cocMode) {
			if (cocBonus || cocPenalty) {
				diceAmount = 2;
			} else if (cocTwoBonus || cocTwoPenalty) {
				diceAmount = 3;
			}
		}
	
		if (fortune && fortuneNum > 0) {
			diceAmount = diceAmount - fortuneNum;
		}
	
		if (itemsToStay && itemsToStay.length) {
			diceAmount = diceAmount - itemsToStay.length;
		}
	
		result.results = getResultsArray(diceTypeNum, diceAmount, keepUnits);
	
		if (itemsToStay && itemsToStay.length) {
			diceAmount = diceAmount + itemsToStay.length;
		}
	
		result.modifier = modifier;
		result.diceAmount = diceAmount;
		result.diceType = diceTypeNum;
		result.diceTypeNum = diceTypeNum;
	
		if (fortune && fortuneNum) {
			for (let i = 0; i < fortuneNum; i++) {
				result.results.push(1);
			}
		}
	
		if (itemsToStay && itemsToStay.length) {
			for (let i = 0; i < itemsToStay.length; i++) {
				result.results.push(itemsToStay[i]);
			}
		}
	
		// Sort results
		result.results = result.results.sort(resultsSorter);
	
		result.totalWithModifier = result.results.reduce((a, b) => Number(a) + Number(b), Number(modifier));
		result.totalWithoutModifier = result.totalWithModifier - Number(modifier);
		result.highest = Math.max(...result.results);
		result.lowest = Math.min(...result.results);
	
		if (isCombatDie) {
			const combatDieResults = result.results.reduce((total, current) => {
				if (current >= 5) {
					total.dmg = total.dmg + 1;
					total.effects = total.effects + 1;
				} else if (current === 1 || current === 2) {
					total.dmg = total.dmg + current;
				}
				return total;
			}, {dmg: 0, effects: 0});	
			result.dmg = combatDieResults.dmg;
			result.effects = combatDieResults.effects;
		}
	
		if (cocMode) {
			result.cocBonusResult = (cocBonus || cocTwoBonus) ? Math.min(...result.results) : undefined;
			result.cocPenaltyResult = (cocPenalty || cocTwoPenalty) ?  Math.max(...result.results) : undefined;
			result.cocBonus = cocBonus;
			result.cocPenalty = cocBonus;
			result.cocTwoBonus = cocTwoBonus;
			result.cocTwoPenalty = cocTwoPenalty;
		}
	
		if (cocMode || rollOptions.warhammerMode) {
			result.skillLevel = skillLevel ? Number(skillLevel) : undefined;
		}
	
		if (rollOptions.assistanceDiceResults) {
			result.assistanceDiceResults = rollOptions.assistanceDiceResults;
		} else if (rollOptions.assistanceDice) {
			result.assistanceDiceResults = getResultsArray(
				20,
				Number(rollOptions.assistanceDice),
				false
			);
			rollOptions.assistanceDiceResults = result.assistanceDiceResults;
		}
	
		if (modifier === 0) {
			result.modSymbol = '';
		} else if (modifier > 0) {
			result.modSymbol = '+';
		} else {
			result.modSymbol = '-';
		}

		store.dispatch(diceRolled({
			result,
			rollOptions
		}));

	} else {
		next(action);
	}
};

export default roll;