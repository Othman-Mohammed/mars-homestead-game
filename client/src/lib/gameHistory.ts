import { PlacedItem } from './gameTypes';

export interface HistoryState {
  placedItems: PlacedItem[];
  timestamp: number;
}

export class GameHistory {
  private history: HistoryState[] = [];
  private currentIndex: number = -1;
  private maxHistory: number = 50;

  pushState(placedItems: PlacedItem[]): void {
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    this.history.push({
      placedItems: JSON.parse(JSON.stringify(placedItems)),
      timestamp: Date.now(),
    });

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  undo(): PlacedItem[] | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex].placedItems));
    }
    return null;
  }

  redo(): PlacedItem[] | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex].placedItems));
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  getHistoryLength(): number {
    return this.history.length;
  }
}
