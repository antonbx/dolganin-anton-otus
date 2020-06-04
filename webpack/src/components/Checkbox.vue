<template>
	<div class="checkbox">
		<input type="checkbox" :id="id" v-model="model" />
		<label :for="id">
			<slot></slot>
		</label>
	</div>
</template>

<script>
	export default {
		name: 'Checkbox.vue',
		props: {
			id: {
				type: String,
				required: true
			},
			checked: {
				type: Boolean
			}
		},
		computed: {
			model: {
				get() {
					return this.checked;
				},
				set(val) {
					this.$emit('change', this.id, val);
				},
			},
		},
	}
</script>

<style scoped>
	.checkbox {
		margin-bottom: 10px;
	}
</style>