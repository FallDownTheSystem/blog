<template>
	<div class="flex">
		<input type="text" class="bg-gray-700 mr-4" :placeholder="placeholderText" />
		<button type="button" class="bg-gray-600 px-4 py-1" @click="placeholderText += '!'">Change text</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			placeholderText: 'Dynamic text!'
		};
	}
};
</script>
