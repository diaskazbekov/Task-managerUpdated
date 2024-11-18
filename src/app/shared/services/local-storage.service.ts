import { Injectable } from '@angular/core';
import { ELocalStorageKey } from "../enums/local-storage-key.enum";
import { EColor } from "../enums/color.enum";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item: string | null = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  initMockData(): void {
    if (!this.getItem(ELocalStorageKey.TAGS)) {
      this.setItem(ELocalStorageKey.TAGS, [
        {
          id: 1,
          code: 'productivity',
          title: 'Продуктивность',
          color: EColor.PURPLE
        },
        {
          id: 2,
          code: 'education',
          title: 'Образование',
          color: EColor.GREEN
        },
        {
          id: 3,
          code: 'health',
          title: 'Здоровье',
          color: EColor.ORANGE
        },
        {
          id: 4,
          code: 'urgently',
          title: 'Срочно',
          color: EColor.RED
        }
      ]);
    }
    if (!this.getItem(ELocalStorageKey.TASKS)) {
      this.setItem(ELocalStorageKey.TASKS, []);
    }
  }
}
