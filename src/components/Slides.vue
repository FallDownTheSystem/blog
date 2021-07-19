<template>
	<div ref="root" class="relative slides">
		<div class="absolute right-8 top-4 text-sm text-gray-400">{{ slideIndex + 1 }} / {{ slides.length }}</div>
		<slot></slot>
		<div class="flex justify-between items-center content-center">
			<button
				type="button"
				@click="back"
				class="
					p-1
					hover:shadow-md
					transition-shadow
					duration-50
					disabled:shadow-none
					focus:outline-none
					focus:ring-2
					ring-gray-400
					bg-gray-700
					hover:bg-gray-600
					disabled:bg-gray-800
					text-gray-300
					hover:text-gray-100
					disabled:text-gray-500
					rounded
					disabled:
				"
				:disabled="slideIndex === 0"
			>
				<i-heroicons-solid:chevron-left class="h-6 w-6" />
			</button>
			<button
				type="button"
				class="
					p-1
					hover:shadow-md
					transition-shadow
					duration-50
					disabled:shadow-none
					focus:outline-none
					focus:ring-2
					ring-gray-400
					bg-gray-700
					hover:bg-gray-600
					disabled:bg-gray-800
					text-gray-300
					hover:text-gray-100
					disabled:text-gray-500
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
import { onMounted, ref } from 'vue';

ref: slideIndex = 0;

ref: slides = [];

const root = ref(null);

onMounted(() => {
	slides = [...root.value.querySelectorAll('.slide')];
	for (const slide of slides.slice(1)) {
		slide.classList.toggle('!hidden');
	}
});

// const currentComponent = computed(() => childComponents[slideIndex]);

const forward = () => {
	if (slideIndex < slides.length - 1) {
		slides[slideIndex].classList.toggle('!hidden');
		slideIndex++;
		slides[slideIndex].classList.toggle('!hidden');
	}
};

const back = () => {
	if (slideIndex > 0) {
		slides[slideIndex].classList.toggle('!hidden');
		slideIndex--;
		slides[slideIndex].classList.toggle('!hidden');
	}
};
</script>
