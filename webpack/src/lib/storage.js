export default class Storage {
	store;
	storage;
	storageKey = 'storage10';

	constructor() {
		this.storage = window.localStorage;
	}

	setStateStore(store) {
		this.store = store;
	}

	getStore() {
		let store = this.storage.getItem(this.storageKey);
		if (store) {
			store = JSON.parse(store);
		}
		return store || {};
	}

	setStore(store) {
		this.store.dispatch('updateData', store);
		this.storage.setItem(this.storageKey, JSON.stringify(store));
	}
}