<template>
	<div>
		<input type="text" class="bg-gray-700 mr-2" @input="handleChange" :value="inputValue" />
		<span>{{ inputValue }}</span>
		<br />
		<button type="button" class="bg-gray-600 px-4 py-1 rounded mt-2" @click="reverse(inputValue)">Reverse text</button>
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
		},
		reverse(value) {
			this.inputValue = value.split('').reverse().join('');
		}
	}
};
</script>
