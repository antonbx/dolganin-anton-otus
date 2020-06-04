import Vue from 'vue';
// @ts-ignore
import Settings from './components/Settings';

new Vue({
	el: '#app',
	template: '<Settings/>',
	components: { Settings }
})