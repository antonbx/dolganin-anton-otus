import Vue from 'vue';
import Vuex from 'vuex';
import getExpression from '../lib/expression';

Vue.use(Vuex);

export default new Vuex.Store({
	actions: {
		updateData({commit}, data) {
			commit('updateData', data);
		},
		updateAnswer({commit}, answer) {
			commit('updateAnswer', answer);
		},
		updateExpression({commit}) {
			commit('updateExpression');
		}
	},
	mutations: {
		updateData(state, data) {
			state.data = data;
		},
		updateAnswer(state, answer) {
			if (answer === null) {
				state.answer = answer;
				return;
			}
			if (!state.answer) {
				state.answer = '';
			}
			state.answer += '' + answer;
		},
		updateExpression(state) {
			state.expression = getExpression(['sum']);
		}
	},
	getters: {
		data(state) {
			return state.data;
		},
		answer(state) {
			return state.answer ? parseInt(state.answer) : 0;
		},
		expression(state) {
			return state.expression;
		}
	},
	state: {
		data: {},
		expression: '',
		answer: null
	}
});