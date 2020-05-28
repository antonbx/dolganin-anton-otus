import { IState } from './interface';

export default class Storage {
	private readonly storage;
	private readonly storageKey: string = 'storage3';
	private readonly store: IState = {
		favorite: [],
		query: ''
	};

	constructor() {
		this.storage = window.localStorage;
	}

	getStore(): IState {
		let store = this.storage.getItem(this.storageKey);
		if (store) {
			store = JSON.parse(store);
		}
		return store || this.store;
	}

	setStore(store: IState): void {
		this.storage.setItem(this.storageKey, JSON.stringify(store));
	}
}