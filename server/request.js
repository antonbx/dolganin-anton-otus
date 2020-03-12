const axios = require('axios');
const config = require('./config');

let url = config.protocol + '://' + config.host + ':' + config.port + '/';
let args = process.argv.slice(2);
let count = 0;
let isAwait = false;

// #
const query = (url) => {
	return axios.get(url);
};

// парсинг переменных
for (let i = 0, c = args.length; i < c; i++) {
	if (args[i] === '-count' || args[i] === '--count') {
		if (typeof args[i+1] !== 'undefined') {
			count = parseInt(args[i+1]);
		}
	}
	else if (args[i] === '-await' || args[i] === '--await') {
		isAwait = true;
	}
}

// делаем запросы
(async () => {
	console.log('START WORK');
	for (let i = 1; i <= count; i++) {
		console.log('start getting...');
		let localUrl = url + '?i=' + i;
		if (isAwait) {
			let result = await query(localUrl);
			console.log('answer', result.data)
		} else {
			let result = query(localUrl);
			result.then((res) => console.log('answer', res.data));
		}
	}
	console.log('FINISH WORK');
})();
