<template>
	<div class="flex p-8 max-w-[44rem] space-x-8 mx-auto">
		<router-link
			v-if="articleNav?.prev"
			:to="articleNav?.prev?.path"
			class="group flex flex-col items-center mr-auto w-[18rem] hover:bg-gray-800 focus:outline-none focus:bg-gray-800 text-gray-100 space-y-2 px-4 py-2 rounded"
		>
			<i-heroicons-outline:arrow-left class="w-6 h-6 group-hover:text-gray-300 group-focus:text-gray-300 text-gray-600" />
			<span>{{ articleNav?.prev?.meta?.title }}</span>
		</router-link>
		<router-link
			v-if="articleNav?.next"
			:to="articleNav?.next?.path"
			class="group flex flex-col items-center ml-auto w-[20rem] hover:bg-gray-800 focus:outline-none focus:bg-gray-800 text-gray-100 space-y-2 px-4 py-2 rounded"
		>
			<i-heroicons-outline:arrow-right class="w-6 h-6 group-hover:text-gray-300 group-focus:text-gray-300 text-gray-600" />
			<span>{{ articleNav?.next?.meta?.title }}</span>
		</router-link>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
	articleNav: Object
});
</script>

<style scoped></style>
