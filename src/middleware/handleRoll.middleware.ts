import { D6_CONAN, D20_CONAN_TEST, D20_CONAN_HL } from '../consts/conanConstants';
import { D100_SL } from '../consts/warhammerConstants';
import { openWarhammerModal, openCoCModal, openConanModal, openModifierModal } from '../actions/modals';
import { storeSelectedDice } from '../actions';
import { requestRoll, resetRollCounter, ROLL_SUBMITTED } from '../actions/roll.actions';

const handleRoll = (store:any) => (next:any) => (action:any) => {
	if (action.type === ROLL_SUBMITTED) {

		store.dispatch(resetRollCounter());

		const state = store.getState();
		const { form : { diceModuleForm } } = state;

		if (diceModuleForm) {
			const formValues = diceModuleForm.values || {}
			const { diceType, diceAmount } = action.payload;

			store.dispatch(storeSelectedDice({
				diceType,
				diceAmount
			}));


			if (formValues.cocMode && diceType === D100_SL) {
				store.dispatch(openCoCModal());
			} else if (formValues.warhammerMode && diceType === D100_SL) {
				openWarhammerModal();
				store.dispatch(openWarhammerModal())
			} else if (diceType === D20_CONAN_TEST) {
				openConanModal();
			} else if (diceType === D6_CONAN || diceType === D20_CONAN_HL) {
				formValues.useModifier = false;
			} else if (formValues.useModifier) {
				store.dispatch(openModifierModal());
			} else {
				store.dispatch(requestRoll({
					diceType,
					diceAmount,
					modifier: 0
				}));
			}
		}
	} else {
		next(action);
	}
};

export default handleRoll;
