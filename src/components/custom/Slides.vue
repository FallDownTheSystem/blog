<template>
	<div ref="root" class="relative slides">
		<div class="absolute right-8 top-4 text-sm text-gray-400">{{ slideIndex + 1 }} / {{ slides.length }}</div>
		<slot></slot>
		<div class="flex justify-between items-center content-center">
			<button
				type="button"
				aria-label="Previous slide"
				@click="back"
				class="
					p-1
					hover:shadow-md
					transition-shadow
					duration-50
					disabled:shadow-none
					focus:outline-none focus:ring-2
					ring-gray-400
					dark:bg-gray-700
					bg-gray-300
					text-gray-600
					hover:text-gray-700
					dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-gray-100
					disabled:text-gray-400 disabled:bg-gray-200
					dark:disabled:bg-gray-800 dark:disabled:text-gray-500
					rounded
				"
				:disabled="slideIndex === 0"
			>
				<i-heroicons-solid:chevron-left class="h-6 w-6" />
			</button>
			<button
				type="button"
				aria-label="Next slide"
				class="
					p-1
					hover:shadow-md
					transition-shadow
					duration-50
					disabled:shadow-none
					focus:outline-none focus:ring-2
					ring-gray-400
					dark:bg-gray-700
					bg-gray-300
					text-gray-600
					hover:text-gray-700
					dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-gray-100
					disabled:text-gray-400 disabled:bg-gray-200
					dark:disabled:bg-gray-800 dark:disabled:text-gray-500
					rounded
				"
				@click="forward"
				:disabled="slideIndex === slides.length - 1"
			>
				<i-heroicons-solid:chevron-right class="h-6 w-6" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

let slideIndex = ref(0);
let slides = ref([]);
const root = ref(null);

onMounted(() => {
	nextTick(() => {
		slides.value = [...root.value.querySelectorAll('.slide')];
		for (const slide of slides.value.slice(1)) {
			slide.classList.add('!hidden');
		}
	});
});

// const currentComponent = computed(() => childComponents[slideIndex]);

const forward = () => {
	if (slideIndex.value < slides.value.length - 1) {
		slides.value[slideIndex.value].classList.toggle('!hidden');
		slideIndex.value++;
		slides.value[slideIndex.value].classList.toggle('!hidden');
	}
};

const back = () => {
	if (slideIndex.value > 0) {
		slides.value[slideIndex.value].classList.toggle('!hidden');
		slideIndex.value--;
		slides.value[slideIndex.value].classList.toggle('!hidden');
	}
};
</script>
