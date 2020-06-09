const getRandom = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
}

const typeToSign = (type) => {
	switch (type) {
		case 'sum':
			return '+';
		case 'diff':
			return '-';
		case 'mult':
			return '*';
		case 'div':
			return '/';
	}
};

export default (types) => {

	if (!types) {
		return '';
	}

	const type = types[getRandom(types.length)];

	let first = getRandom(10) + 1;
	let second = getRandom(10) + 1;

	if (type === 'div') {
		if (first < second) {
			let tmp = second;
			second = first;
			first = tmp;
		}
		if (first % second > 0) {
			first = first - first % second;
		}
	}

	return first + ' ' + typeToSign(type) + ' ' + second;
};