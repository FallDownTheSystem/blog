<template>
	<div class="flex flex-col">
		<span>Animals: {{ animals }}</span>
		There are {{ catCount }} cats
	</div>
	<button type="button" class="bg-gray-600 px-4 py-1 rounded mt-2" @click="animals.push('Cat')">Add a cat</button>
</template>

<script>
export default {
	data() {
		return {
			animals: ['Cat', 'Dog', 'Bird', 'Cat', 'Lizard']
		};
	},
	computed: {
		catCount() {
			return this.animals.filter(x => x === 'Cat').length;
		}
	}
};
</script>
