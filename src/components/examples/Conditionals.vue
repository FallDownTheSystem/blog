<template>
	<div class="flex flex-col items-start">
		<span v-if="showMessage">Now you see me</span>
		<b v-else>Now you don't</b>
		<button type="button" class="bg-gray-600 px-4 py-1 rounded mt-2" @click="showMessage = !showMessage">Toggle</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMessage: true
		};
	}
};
</script>
