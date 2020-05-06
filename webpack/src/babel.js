async function start() {
	return await Promise.resolve('is working');
}

start().then(console.log);

class Util {
	static id = Date.now();
}

console.log('util id', Util.id);