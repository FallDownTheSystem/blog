<template>
	<div class="pb-2 my-8">
		<div class="flex justify-between">
			<span class="text-xl font-bold mt-0.5">{{ title }}</span>
			<i-heroicons-outline:information-circle v-if="type == 'info'" class="w-8 h-8 ml-8 text-blue-600 flex-shrink-0" />
			<i-heroicons-outline:check-circle v-else-if="type == 'tip'" class="w-8 h-8 ml-8 text-emerald-600 flex-shrink-0" />
			<i-heroicons-outline:x-circle v-else-if="type == 'danger'" class="w-8 h-8 ml-8 text-rose-600 flex-shrink-0" />
			<i-heroicons-outline:exclamation-circle v-else-if="type == 'warn'" class="w-8 h-8 ml-8 text-yellow-600 flex-shrink-0" />
			<i-heroicons-outline:search-circle v-else-if="type == 'note'" class="w-8 h-8 ml-8 text-purple-600 flex-shrink-0" />
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			required: false,
			type: String
		},
		type: {
			required: true,
			type: String
		}
	}
};
</script>

<style scoped></style>
