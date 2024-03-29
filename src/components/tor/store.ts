import create from "zustand";
import getResultsArray from "../../utils/getResultsArray";
import { requestMsgReady } from "../../actions/roll.actions";
import reduxStore from "../../store";
import { getDiscordMsgData } from "./getDiscordMsgData";
import { EYE_SCORE, GANDALF_SCORE } from "../../consts/torDice";

export type State = {
  openModal: () => void;
  isModalOpen: boolean;
  isResultsModalOpen: boolean;

  openResultsModal: () => void;
  closeModal: () => void;
  closeResultsModal: () => void;

  rollDice: (isRerolling?: boolean) => void;
  wasAllDiceRerolled: boolean;

  tn: string;
  successDiceAmount: string;
  modifier: string;
  isFavoured: boolean;
  isIllFavoured: boolean;
  isWeary: boolean;
  isMiserable: boolean;
  isAdversary: boolean;

  wasRerolled: boolean;

  setTn: (tn: string) => void;
  setIsFavoured: (isFavoured: boolean) => void;
  setIsIllFavoured: (isIllFavoured: boolean) => void;
  setIsWeary: (isWeary: boolean) => void;
  setIsMiserable: (isMiserable: boolean) => void;
  setIsAdversary: (isAdversary: boolean) => void;
  setSuccessDiceAmount: (successDiceAmount: string) => void;
  setModifier: (modifier: string) => void;

  // Results
  isSuccess: null | boolean;
  featDiceResults: number[];
  successDiceResults: number[];
  featDieScore: null | number;
  totalDiceScore: null | number;
};

const useStore = create<State>((set, get) => ({
  isModalOpen: false,
  isResultsModalOpen: false,
  wasAllDiceRerolled: false,
  tn: "",
  successDiceAmount: "0",
  modifier: "0",
  isFavoured: false,
  isIllFavoured: false,
  isWeary: false,
  isMiserable: false,

  wasRerolled: false,
  isAdversary: false,

  // Results
  isSuccess: null,
  featDiceResults: [],
  successDiceResults: [],
  featDieScore: null,
  totalDiceScore: null,

  openModal: () =>
    set({
      isModalOpen: true,
      wasRerolled: false,
      isSuccess: null,
      featDiceResults: [],
      successDiceResults: [],
      featDieScore: null,
      totalDiceScore: null,
      modifier: "0",
    }),
  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),

  setTn: (tn) => set({ tn }),
  setIsFavoured: (isFavoured) => set({ isFavoured }),
  setIsIllFavoured: (isIllFavoured) => set({ isIllFavoured }),
  setIsWeary: (isWeary) => set({ isWeary }),
  setIsMiserable: (isMiserable) => set({ isMiserable }),
  setIsAdversary: (isAdversary) => set({ isAdversary }),
  setSuccessDiceAmount: (successDiceAmount) => set({ successDiceAmount }),
  setModifier: (modifier) => set({ modifier }),

  rollDice: (isRerolling) => {
    const {
      tn,
      isFavoured,
      isIllFavoured,
      successDiceAmount,
      modifier,
      isAdversary,
      isWeary,
      isMiserable,
    } = get();

    const featDiceAmount = isFavoured || isIllFavoured ? 2 : 1;
    const featDiceResults = getResultsArray(12, featDiceAmount, false, false);
    const successDiceResults = getResultsArray(
      6,
      Number(successDiceAmount),
      false,
      false
    );

    // Get FEAT DICE score
    const FAVOURED_DIE = isAdversary ? EYE_SCORE : GANDALF_SCORE;
    const ILL_FAVOURED_DIE = isAdversary ? GANDALF_SCORE : EYE_SCORE;
    let featDieScore: number;

    if (isFavoured) {
      if (featDiceResults.includes(FAVOURED_DIE)) {
        featDieScore = FAVOURED_DIE;
      } else if (featDiceResults[1] === ILL_FAVOURED_DIE) {
        featDieScore = featDiceResults[0];
      } else if (featDiceResults[0] === ILL_FAVOURED_DIE) {
        featDieScore = featDiceResults[1];
      } else {
        featDieScore = Math.max(...featDiceResults);
      }
    } else if (isIllFavoured) {
      if (featDiceResults.includes(ILL_FAVOURED_DIE)) {
        featDieScore = ILL_FAVOURED_DIE;
      } else if (featDiceResults[1] === FAVOURED_DIE) {
        featDieScore = featDiceResults[0];
      } else if (featDiceResults[0] === FAVOURED_DIE) {
        featDieScore = featDiceResults[1];
      } else {
        featDieScore = Math.min(...featDiceResults);
      }
    } else {
      featDieScore = featDiceResults[0];
    }

    // Get SUCCESS DICE score
    const successDiceScore = successDiceResults.reduce(
      (previousValue, currentValue) => {
        if (isWeary && currentValue <= 3) {
          return previousValue;
        }
        return previousValue + currentValue;
      },
      0
    );

    // Get TOTAL DICE score
    let totalDiceScore: number;

    if (featDieScore === EYE_SCORE || featDieScore === GANDALF_SCORE) {
      totalDiceScore = successDiceScore;
    } else {
      totalDiceScore = successDiceScore + featDieScore;
    }

    // Add MODIFIER to the score
    const modifierNumber = Number(modifier);
    if (modifier && !isNaN(modifierNumber)) {
      totalDiceScore += modifierNumber;
    }

    // Get SUCCESS result
    let isSuccess = totalDiceScore >= Number(tn);

    // Auto failure
    if (isMiserable) {
      if (featDieScore === ILL_FAVOURED_DIE) {
        isSuccess = false;
      }
    }

    // Auto success
    if (featDieScore === FAVOURED_DIE) {
      isSuccess = true;
    }

    // Set results
    set({
      isSuccess,
      featDiceResults,
      successDiceResults,
      featDieScore,
      totalDiceScore,
      isResultsModalOpen: true,
      wasRerolled: Boolean(isRerolling),
    });

    reduxStore.dispatch(
      requestMsgReady(
        getDiscordMsgData({
          isSuccess,
          featDiceResults,
          successDiceResults,
          featDieScore,
          totalDiceScore,
          wasRerolled: Boolean(isRerolling),
          tn,
          isFavoured,
          isIllFavoured,
          isWeary,
          isMiserable,
          isAdversary,
          modifier,
        })
      )
    );
  },
}));

export default useStore;
