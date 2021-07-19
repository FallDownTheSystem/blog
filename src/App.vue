<template>
	<router-view />
</template>

<script setup>
import { useHead } from '@vueuse/head';

useHead({
	title: 'Modern JavaScript',
	meta: [{ name: 'description', content: 'Modern JavaScript' }]
});
</script>

<style></style>
