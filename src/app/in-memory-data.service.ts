import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './items/items.interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 1, text: 'Buy groceries', isChecked: false },
      { id: 2, text: 'Do laundry', isChecked: true },
      { id: 3, text: 'Clean the house', isChecked: false },
      { id: 4, text: 'Pay bills', isChecked: false },
      { id: 5, text: 'Go for a run', isChecked: true },
      { id: 6, text: 'Finish work project', isChecked: false },
      { id: 7, text: 'Call mom', isChecked: false },
      { id: 8, text: 'Read a book', isChecked: true },
      { id: 9, text: 'Watch a movie', isChecked: false },
      { id: 10, text: 'Take a nap', isChecked: false },
    ];
    return { items };
  }
  // Overrides the genId method to ensure that a item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (11).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Item[]): number {
    return items.length > 0
      ? Math.max(...items.map((item) => item.id)) + 1
      : 1;
  }
}
