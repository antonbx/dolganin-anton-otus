import Vue from 'vue';
import VueRouter from 'vue-router';
// @ts-ignore
import Settings from './components/Settings';
import Game from './components/Game';
import store from './lib/store';

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Settings },
	{ path: '/game', component: Game }
];

const router = new VueRouter({
	routes
});

new Vue({
	store,
	router
}).$mount('#app');