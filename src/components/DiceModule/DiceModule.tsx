import React from 'react';
import './DiceModule.css';
import { classic } from '../../consts/diceSets';
import Dice from './Dice';
import DiceModuleOptions from './DiceModuleOptions';
import { request } from '../../utils/request';
import getRequestMsg from '../../utils/getRequestMsg';
import getLocalMsg from '../../utils/getLocalMsg';
import rollDice from '../../utils/rollDice';

type DiceModuleProps = {
	userSettings: any,
	rollOptions: any,
	showMsg: Function,
	openCoCModal: Function,
	openModifierModal: Function,
	selectDice: Function
};

function DiceModule ({
	userSettings,
	rollOptions,
	showMsg,
	openModifierModal,
	openCoCModal,
	selectDice
}:DiceModuleProps
) {
	const handleRoll = (diceType:number, diceAmount:number) => {
		const result = rollDice({
			diceType,
			diceAmount,
			rollOptions,
			modifier: 0
		});
		const requestMsg = getRequestMsg(result, rollOptions, userSettings);
		const localMsg = getLocalMsg(result, rollOptions);

		showMsg(localMsg);
		request(requestMsg);
	};

	const handleRollDice = (diceType:number, diceAmount:number = 1) => {
		if (rollOptions.cocMode) {
			openCoCModal();
			return;
		}
		if (rollOptions.useModifier) {
			selectDice({ diceType, diceAmount });
			openModifierModal();
		} else {
			handleRoll(diceType, diceAmount);
		}
	};

	const diceSet = classic.map(diceType => {
		return (
			<Dice
				key={diceType}
				diceType={diceType}
				handleRollDice={handleRollDice}
				rollOptions={rollOptions}
			/>
		);
	});

	return (
		<div className="dice-module-container">
			<DiceModuleOptions
				rollOptions={rollOptions}
			/>
			<div className="dice-module dice-list">
				{diceSet}
			</div>
		</div>
	);
}

export default DiceModule;