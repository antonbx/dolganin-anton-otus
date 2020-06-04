<template>
	<div class="radio-button">
		{{from}} <input type="range" :min="from" :max="to" @change="$emit('change', $event.target)" :value="value"> {{to}}
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ButtonRange.vue',
		props: {
			from: {
				type: Number,
				default: 1
			},
			to: {
				type: Number,
				default: 10
			},
			value: {
				type: Number,
				default: 5
			}
		}
	}
</script>

<style scoped>
	.radio-button {
		margin-bottom: 10px;
	}
</style>