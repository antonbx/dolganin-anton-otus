import * as $ from 'jquery';

function createAnalytics() {
	let counter = 0;
	let isDestroyed = false;

	const listener = () => counter++;

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

window.analytics = createAnalytics();