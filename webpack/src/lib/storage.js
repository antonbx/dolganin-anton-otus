export default class Storage {
	storage;
	storageKey = 'storage10';

	constructor() {
		this.storage = window.localStorage;
	}

	getStore() {
		let store = this.storage.getItem(this.storageKey);
		if (store) {
			store = JSON.parse(store);
		}
		return store || {};
	}

	setStore(store) {
		this.storage.setItem(this.storageKey, JSON.stringify(store));
	}
}