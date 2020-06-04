import Storage from './lib/storage';

const storage = (new Storage()).getStore();

const data = {
	duration: storage.duration || 7,
	level: storage.level || 5,
	gameDay: storage.gameDay || 1,
	lastSuccess: storage.lastSuccess || 0,
	lastTotal: storage.lastTotal || 0,
	winRate: storage.winRate || 0,
	typesIncluded: storage.typesIncluded || ['sum', 'div', 'pow']
};

export default data;