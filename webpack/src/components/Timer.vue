<template>
	<span class="time">{{getFormattedTime()}}</span>
</template>

<script>
	export default {
		name: 'Timer.vue',
		props: {
			time: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				interval: null,
				currentTime: 0
			};
		},
		methods: {
			tickTime() {
				this.currentTime--;
			},
			getFormattedTime() {
				if (this.currentTime <= 0) {
					clearInterval(this.interval);
					this.$emit('finish');
					return;
				}
				let seconds = this.currentTime % 60;
				return parseInt(this.currentTime / 60) + ':' +
						(seconds < 10 ? '0' : '') + seconds;
			}
		},
		created() {
			this.currentTime = this.time;
			this.interval =setInterval(function() {
				this.tickTime();
			}.bind(this), 1000);
		}
	}
</script>

<style scoped>
	.time {
		margin-left: 150px;
	}
</style>