<template>
	<div>
		<input type="text" class="bg-gray-700 mr-2" @input="handleChange" />
		<span>{{ inputValue }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			inputValue: ''
		};
	},
	methods: {
		handleChange(event) {
			this.inputValue = event.target.value;
		}
	}
};
</script>
