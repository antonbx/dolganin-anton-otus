<template>
	<div id="settings">
		<h1>Привет!</h1>

		<p v-if="lastTotal > 0">
			Добро пожаловать на {{gameDay}} тренировочный день.<br/>
			Ваш последний результат &mdash; решено {{lastSuccess}} из {{lastTotal}}.<br/>
			Общая точность {{winRate}}%.
		</p>
		<p v-else>
			Добро пожаловать на первый день <s>голодных</s> счетных игр!
		</p>

		<h4>Настройки</h4>
		<ButtonRange :from="1" :to="15" :value="duration" @change="changeDuration">
			Длительность: {{duration}} мин.
		</ButtonRange>
		<ButtonRange :from="1" :to="10" :value="level" @change="changeLevel">
			Сложность: {{level}}
		</ButtonRange>

		<div class="types">
			<Checkbox id="sum" :checked="isTypeIncluded('sum')" @change="checkType">Суммирование</Checkbox>
			<Checkbox id="diff" :checked="isTypeIncluded('diff')" @change="checkType">Разность</Checkbox>
			<Checkbox id="mult" :checked="isTypeIncluded('mult')" @change="checkType">Умножение</Checkbox>
			<Checkbox id="div" :checked="isTypeIncluded('div')" @change="checkType">Деление</Checkbox>
			<Checkbox id="pow" :checked="isTypeIncluded('pow')" @change="checkType">Возведение в степень</Checkbox>
		</div>

		<button>Play!</button>
	</div>
</template>

<script>
	import ButtonRange from './ButtonRange.vue';
	import Checkbox from './Checkbox.vue';
	import Storage from '../lib/storage';
	import data from '../data';

	const storageInstance = new Storage;

	export default {
		name: 'Settings.vue',
		components: {
			ButtonRange, Checkbox
		},
		data() {
			return data;
		},
		watch: {
			duration: (value) => storageInstance.setStore({...data, duration: value}),
			level: (value) => storageInstance.setStore({...data, level: value}),
			typesIncluded: (value) => storageInstance.setStore({...data, typesIncluded: value}),
		},
		methods: {
			isTypeIncluded(type) {
				return this.typesIncluded.includes(type);
			},
			changeDuration(input) {
				this.duration = Number(input.value);
			},
			changeLevel(input) {
				this.level = Number(input.value);
			},
			checkType(type, value) {
				if (!this.typesIncluded.includes(type)) {
					this.typesIncluded.push(type);
				}
				this.typesIncluded = this.typesIncluded.filter(
					(item) => {
						return value || item !== type;
					}
				);
			}
		}
	}
</script>

<style scoped>
	.types {
		margin-top: 30px;
		margin-bottom: 30px;
	}
</style>