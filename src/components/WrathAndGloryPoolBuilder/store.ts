import create from 'zustand';
import { persist } from "zustand/middleware"
import addStorePrefix from "../../utils/addStorePrefix";
import { D3, D6, WRATH_AND_GLORY_SKILL_TEST } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";

interface Pool {
	WRATH_AND_GLORY_SKILL_TEST?: number;
	d6?: number
	d3?: number
}

type State = {
	isModalOpen: boolean;
	openModal: () => void
	closeModal: () => void
	rollDice: (pool: Pool) => void
}

const useStore = create<State>(persist(((set, get) => ({
	isModalOpen: false,
	openModal: () => set({ isModalOpen: false}),
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool: Pool) => {
		console.log('pool', pool)

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]
		const d6 = pool[D6]
		const d3 = pool[D3]

		const results = getResultsArray(6, skillDice);
		const normalIcons = results.filter(val => val === 4 || val === 5).length;
		const exaltedIcons = results.filter(val => val === 6).length * 2;
		const totalIcons = normalIcons + exaltedIcons

		console.log('results', results)
		console.log('normalIcons', normalIcons)
		console.log('exaltedIcons', exaltedIcons)
		console.log('totalIcons', totalIcons)
	}

})), {
	name: addStorePrefix('wrath-and-glory')
}));

export default useStore;