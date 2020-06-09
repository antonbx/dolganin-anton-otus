<template>
	<div>
		<button @click="cancel">X</button>
		<Timer :time="data.duration * 60" @finish="cancel" />
		<div class="task">
			{{expression}} = ??
		</div>
		<div class="answer">
			Ваш ответ: {{answer}}
		</div>
		<div>
			<button @click="updateAnswer(1)">1</button>
			<button @click="updateAnswer(2)">2</button>
			<button @click="updateAnswer(3)">3</button>
			<br/>
			<button @click="updateAnswer(4)">4</button>
			<button @click="updateAnswer(5)">5</button>
			<button @click="updateAnswer(6)">6</button>
			<br/>
			<button @click="updateAnswer(7)">7</button>
			<button @click="updateAnswer(8)">8</button>
			<button @click="updateAnswer(9)">9</button>
			<br/>
			<button @click="updateAnswer(0)">0</button>
			<button @click="checkAnswer" style="background-color: green;">=</button>
		</div>
	</div>
</template>

<script>
	import Timer from './Timer';
	import {mapGetters} from 'vuex';

	export default {
		name: 'Game.vue',
		components: {
			Timer
		},
		computed: {
			...mapGetters(['data', 'answer', 'expression'])
		},
		methods: {
			cancel() {
				this.$router.push('/');
				this.$store.dispatch('updateAnswer', null);
			},
			updateAnswer(value) {
				this.$store.dispatch('updateAnswer', value);
			},
			checkAnswer() {
				if (eval(this.expression) === this.answer) {
					alert('OK!');
				}
				this.$store.dispatch('updateAnswer', null);
				this.$store.dispatch('updateExpression');
			}
		},
		created() {
			if (!this.data.duration) {
				this.cancel();
			}
			this.$store.dispatch('updateExpression');
		}
	}
</script>

<style scoped>
	.task {
		margin: 20px 0 10px 30px;
		font-size: 20px;
		font-weight: bold;
	}
	.answer {
		font-weight: bold;
		color: green;
		margin: 20px 0 20px 30px;
	}
	button {
		width: 30px;
		height: 30px;
		margin: 10px;
	}
</style>