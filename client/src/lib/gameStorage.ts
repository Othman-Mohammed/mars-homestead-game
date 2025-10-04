import { PlacedItem, Resources, INITIAL_RESOURCES } from './gameTypes';

const STORAGE_KEY = 'mars-habitat-save';

export interface SaveData {
  placedItems: PlacedItem[];
  resources: Resources;
  timestamp: number;
}

export const saveGame = (placedItems: PlacedItem[], resources: Resources): void => {
  const saveData: SaveData = {
    placedItems,
    resources,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
};

export const loadGame = (): SaveData | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  
  try {
    const data = JSON.parse(saved) as SaveData;
    return data;
  } catch (error) {
    console.error('Failed to load save data:', error);
    return null;
  }
};

export const clearSave = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const hasSavedGame = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
