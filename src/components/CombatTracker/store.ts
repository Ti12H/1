import create from "zustand";
import { persist } from "zustand/middleware";
import { createCombatant, createCombatantId } from "./utils/utils";
import addStorePrefix from "../../utils/addStorePrefix";

export interface CreateCombatant {
  name: string;
  hp: number;
  initiative: number;
  zoneIndex: number;
}

export interface CombatantTypes extends CreateCombatant {
  wounds: string;
  conditions: string;
  id: number;
  isLocked: boolean;
  hpMax: number;
  advantage: number;
}

type ZoneIndex = number | null;

export type CombatantTypesEditableFields = Exclude<
  keyof CombatantTypes,
  "zoneIndex" | "id" | "isLocked" | "hpMax"
>;

type State = {
  renders: number;
  isModalOpen: boolean;
  isDragging: boolean;
  zones: string[];
  hoverZone: ZoneIndex;
  combatants: CombatantTypes[];
  openModal: () => void;
  closeModal: () => void;
  addZone: (name: string) => void;
  addCombatant: (data: CreateCombatant) => void;
  deleteCombatant: (id: number) => void;
  cloneCombatant: (id: number) => void;
  updateCombatant: (
    id: number,
    field: CombatantTypesEditableFields,
    value: string
  ) => void;
  lockCombatant: (id: number) => void;
  setCombatantZone: (combatantId: number, zoneIndex: number) => void;
  setIsDragging: (dragState: boolean) => void;
  setHoverZone: (zoneIndex: ZoneIndex) => void;
  forceUpdateCombatants: () => void;
  clearState: () => void;
};

const getIncreasedRenders = (renders: number) => {
  if (renders >= 100) {
    return 1;
  }
  return renders + 1;
};

const useStore = create<State>(
  persist(
    (set, get) => ({
      renders: 0,
      isModalOpen: false,
      isDragging: false,
      zones: [],
      combatants: [],
      hoverZone: null,
      openModal: () => set({ isModalOpen: false }),
      closeModal: () => set({ isModalOpen: false }),
      addZone: (zoneName) =>
        set({
          zones: [...get().zones, zoneName],
        }),
      addCombatant: (data) =>
        set({
          combatants: [...get().combatants, createCombatant(data)],
        }),
      deleteCombatant: (combatantId) =>
        set({
          combatants: get().combatants.filter(({ id }) => id !== combatantId),
        }),
      cloneCombatant: (combatantId) =>
        set((state) => {
          const combatant = state.combatants.find(
            (c) => combatantId === c.id
          ) as CombatantTypes;

          const newCombatant = {
            ...combatant,
            id: createCombatantId(),
          };

          const combatants = [...state.combatants, newCombatant];

          return { combatants };
        }),
      updateCombatant: (combatantId, field, value) => {
        set((state) => {
          const combatant = state.combatants.find((c) => combatantId === c.id)!;
          const combatantIndex = state.combatants.findIndex(
            (c) => combatantId === c.id
          );

          if (
            field === "hp" ||
            field === "initiative" ||
            field === "advantage"
          ) {
            combatant[field] = Number(value);
          } else {
            combatant[field] = value;
          }

          const newCombatants = [...state.combatants];
          newCombatants[combatantIndex] = combatant;

          return {
            combatants: newCombatants,
          };
        });
      },
      lockCombatant: (combatantId) => {
        set({
          combatants: get().combatants.map((combatant) => {
            if (combatantId === combatant.id) {
              combatant.isLocked = !combatant.isLocked;
            }
            return combatant;
          }),
        });
      },
      setCombatantZone: (combatantId, zoneIndex) => {
        set((state) => {
          const combatants = [...state.combatants].map((combatant) => {
            if (combatant.id === combatantId) {
              combatant.zoneIndex = zoneIndex;
            }
            return combatant;
          });
          return {
            combatants,
            renders: getIncreasedRenders(state.renders),
          };
        });
      },
      setIsDragging: (dragState) => set({ isDragging: dragState }),
      setHoverZone: (zoneIndex) => set({ hoverZone: zoneIndex }),
      forceUpdateCombatants: () =>
        set({ renders: getIncreasedRenders(get().renders) }),
      clearState: () =>
        set({
          zones: [],
          combatants: get()
            .combatants.filter((c) => c.isLocked)
            .map((c) => {
              c.zoneIndex = -1;
              return c;
            }),
        }),
    }),
    {
      name: addStorePrefix("combat-tracker"),
    }
  )
);

export default useStore;
