import * as $ from 'jquery';

function createAnalytics(): object {
	let counter = 0;
	let isDestroyed: boolean = false;

	const listener = (): number => counter++;

	document.addEventListener('click', listener);

	$('h3').html('aaaaaaa12123');

	return {
		destroy() {
			document.removeEventListener('click', listener);
			isDestroyed = true;
		},

		getClicks() {
			if (isDestroyed) {
				return 'destroyed!';
			}
			return counter;
		}
	};
}

window['analytics'] = createAnalytics();