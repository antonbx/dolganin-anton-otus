import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage;
  storageKey = 'storage15';

  constructor() {
    this.storage = window.localStorage;
  }

  getStore(): object {
    let store = this.storage.getItem(this.storageKey);
    if (store) {
      store = JSON.parse(store);
    }
    return store || {};
  }

  setStore(store: object) {
    this.storage.setItem(this.storageKey, JSON.stringify(store));
  }

  getStoreKey(key: string): any {
    const store = this.getStore();
    return store[key] || null;
  }

  setStoreKey(key: string, value: any): void {
    const store = this.getStore();
    store[key] = value;
    this.setStore(store);
  }
}
