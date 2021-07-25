<template>
	<div class="flex flex-col mb-16 !max-w-[var(--column-with-gap)] items-center content-center">
		<h1 class="font-serif text-center !mb-8 !text-[length:clamp(4rem,4vw+2rem,7rem)]" :id="slugify(title)">
			<slot>{{ title }}</slot>
		</h1>
		<p v-if="description" class="text-center !mb-0 text-gray-800 dark:text-gray-300">
			<slot name="description">{{ description }}</slot>
		</p>

		<p v-if="published" class="text-sm text-center !mb-0 text-gray-600 dark:text-gray-400">
			<slot name="published">Published {{ new Date(published).toLocaleDateString() }}</slot>
		</p>
	</div>
</template>

<script>
import { slugify } from '../../../build-time/markdown/slugify';
export default {
	props: {
		title: {
			required: false,
			type: String
		},
		description: {
			required: false,
			type: String
		},
		published: {
			required: false,
			type: String
		}
	},
	methods: {
		slugify
	}
};
</script>
