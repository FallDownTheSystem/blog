<template>
	<div class="prose dark:prose-dark mb-14">
		<Title>
			A Blog Template
			<template v-slot:description>This is a blog template with a description.</template>
		</Title>
	</div>
	<!-- Separator -->
	<div class="w-32 bg-gray-400 h-[1px] mb-16"></div>
	<PostList />
	<!-- Push page down a little bit -->
	<div class="h-32"></div>
</template>

<script setup>
import { useHead } from '@vueuse/head';

useHead({
	title: 'Blog',
	meta: [{ name: 'description', content: 'Blog example description' }]
});
</script>

<route>
{
	meta: {
		layout: "home"
	}
}
</route>
