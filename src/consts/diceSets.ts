import {
  D6_CONAN,
  D20_CONAN_TEST,
  D20_CONAN,
  D20_CONAN_HL,
  D6_INFINITY,
  D20_INFINITY_TEST,
  D20_INFINITY,
  D20_INFINITY_HL,
  D100_SL,
  D100,
  D66,
  D20,
  D12,
  D10,
  D8,
  D6,
  D4,
  POOL,
  MODIFIER,
  BOOST,
  DIFFICULTY,
  ABILITY,
  CHALLENGE,
  FORCE,
  PROFICIENCY,
  SETBACK,
  RING_DIE,
  SKILL_DIE,
  CONAN_TOKENS,
  INFINITY_TOKENS,
  NARRATIVE_TOKENS,
  WARHAMMER_MONEY,
  CTHULHU_SHEET_MODAL,
  COMBAT_TRACKER,
  WRATH_AND_GLORY_SKILL_TEST,
  D3,
  DUNE_TOKENS,
  D20_DUNE_TEST,
  D20_DUNE,
} from "./diceConstants";

import { FATE_DIE } from "./fateConsts";
import { X_CARD } from "../components/XCard/const";

import narrativeDice from "./narrativeDice";
import l5rDice from "./l5rDice";
import { torFeatDie, torSuccessDie, torSkillTest } from "./torDice";

/*******************************************
 *
 * image file name
 * ================
 *
 * die image has to be named {diceType}.png
 * or described in `diceImg` property
 *
 ***************************************** */

const combatTracker = {
  diceType: COMBAT_TRACKER,
  label: "Combat Tracker",
  diceImg: "combat-tracker.png",
  noDropdown: true,
  isExcludedFromPool: true,
};

const xCard = {
  diceType: X_CARD,
  label: "X-Card",
  diceImg: "x_card.png",
  noDropdown: true,
  isExcludedFromPool: true,
};

export const commonDice = [
  {
    diceType: D100,
    label: "d100",
  },
  {
    diceType: D20,
    label: "d20",
  },
  {
    diceType: D12,
    label: "d12",
  },
  {
    diceType: D10,
    label: "d10",
  },
  {
    diceType: D8,
    label: "d8",
  },
  {
    diceType: D6,
    label: "d6",
  },
  {
    diceType: D4,
    label: "d4",
  },
];

export const classicSet = [
  ...commonDice,
  {
    diceType: POOL,
    label: "Pool Builder",
    noDropdown: true,
  },
  combatTracker,
  xCard,
];

export const poolSet = [
  ...commonDice,
  {
    diceType: MODIFIER,
    label: "Apply Modifier",
  },
];

export const CthulhuSet = [
  {
    diceType: D100_SL,
    diceImg: "d100-skill-test.png",
    label: "Skill Test",
    noDropdown: true,
  },
  ...commonDice,
  combatTracker,
  {
    diceType: CTHULHU_SHEET_MODAL,
    diceImg: "sheet-icon.png",
    label: "Character Sheet",
    noDropdown: true,
  },
  xCard,
];

export const warhammerSet = [
  {
    diceType: D100_SL,
    diceImg: "d100-skill-test.png",
    label: "Skill Test",
    noDropdown: true,
  },
  {
    diceType: D100,
    label: "d100",
  },
  {
    diceType: D10,
    label: "d10",
  },
  combatTracker,
  {
    diceType: WARHAMMER_MONEY,
    label: "Money converter",
    diceImg: "warhammer_money/gold.png",
    noDropdown: true,
  },
  xCard,
];

export const conanSet = [
  {
    diceType: D20_CONAN_TEST,
    label: "Skill Test",
    noDropdown: true,
  },
  {
    diceType: D20_CONAN,
    label: "d20",
  },
  {
    diceType: D20_CONAN_HL,
    label: "Hit Location",
    noDropdown: true,
  },
  {
    diceType: D6_CONAN,
    label: "Combat Die",
  },
  {
    diceType: CONAN_TOKENS,
    label: "Update pools",
    diceImg: "conan_tokens.png",
    noDropdown: true,
  },
  xCard,
];

export const infinitySet = [
  {
    diceType: D20_INFINITY_TEST,
    label: "Skill Test",
    noDropdown: true,
  },
  {
    diceType: D20_INFINITY,
    label: "d20",
  },
  {
    diceType: D20_INFINITY_HL,
    label: "Hit Location",
    noDropdown: true,
  },
  {
    diceType: D6_INFINITY,
    label: "Combat Die",
  },
  {
    diceType: INFINITY_TOKENS,
    label: "Update pools",
    diceImg: "infinity_tokens.png",
    noDropdown: true,
  },
  xCard,
];

export const duneSet = [
  {
    diceType: D20_DUNE_TEST,
    label: "Skill Test",
    noDropdown: true,
  },
  {
    diceType: D20_DUNE,
    label: "d20",
  },
  {
    diceType: DUNE_TOKENS,
    label: "Update pools",
    diceImg: "dune_tokens.png",
    noDropdown: true,
  },
  xCard,
];

export const narrativeDiceSet = [
  narrativeDice[BOOST],
  narrativeDice[ABILITY],
  narrativeDice[PROFICIENCY],
  narrativeDice[SETBACK],
  narrativeDice[DIFFICULTY],
  narrativeDice[CHALLENGE],
  narrativeDice[FORCE],
  narrativeDice[D100],
  {
    diceType: NARRATIVE_TOKENS,
    label: "Update pools",
    diceImg: "narrative_tokens.png",
    isExcludedFromPool: true,
    noDropdown: true,
  },
  xCard,
];

export const l5rDiceSet = [
  l5rDice[RING_DIE],
  l5rDice[SKILL_DIE],
  combatTracker,
  {
    diceType: D10,
    label: "d10",
    isExcludedFromPool: true,
    noDropdown: true,
  },
  xCard,
];

export const rollAndKeepDiceSet = [
  {
    diceType: D10,
    label: "Roll and Keep",
    noDropdown: true,
  },
  {
    diceType: MODIFIER,
    label: "Apply Modifier",
  },
  combatTracker,
  xCard,
];

export const fateDiceSet = [
  {
    diceType: FATE_DIE,
    label: "Fate Dice",
  },
  combatTracker,
  xCard,
];

export const wrathAndGloryDiceSet = [
  {
    diceType: WRATH_AND_GLORY_SKILL_TEST,
    label: "Skill Test",
    diceImg: "wrath-and-glory-skill-test.png",
  },
  {
    diceType: D6,
    label: "d6",
  },
  {
    diceType: D3,
    label: "d3",
  },
  {
    diceType: D66,
    label: "d66",
    isExcludedFromPool: true,
    noDropdown: true,
  },
  combatTracker,
  xCard,
];

export const torDiceSet = [torSkillTest, torSuccessDie, torFeatDie, xCard];
