<template>
	<slot></slot>
</template>

<script setup>
import store from '../../store';

const props = defineProps({
	frontmatter: Object
});

onMounted(() => {
	// To trigger an update when the component is mounted
	store.mounted++;
});
</script>
