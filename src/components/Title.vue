<template>
	<div class="flex flex-col mb-16 title items-center content-center">
		<h1 class="font-serif text-center title__header" :id="slugify(title)">
			<slot>{{ title }}</slot>
		</h1>
		<p class="text-center title__description text-gray-300">
			<slot name="description">{{ description }}</slot>
		</p>
	</div>
</template>

<script>
import { slugify } from '../markdown/slugify';
export default {
	props: {
		title: {
			required: false,
			type: String,
			default: 'title'
		},
		description: {
			required: false,
			type: String
		}
	},
	methods: {
		slugify
	}
};
</script>

<style>
.title {
	max-width: 76rem !important;
}
.title .title__header {
	margin-bottom: 4rem !important;
	font-size: 8rem !important;
}

.title .title__description {
	margin: 0px !important;
}
</style>
