<template>
	<div
		class="
			flex
			content-center
			items-center
			h-24
			px-8
			w-full
			sticky
			top-0
			z-30
			backdrop-filter backdrop-blur
			bg-white bg-opacity-75
			firefox:bg-opacity-95
			dark:bg-opacity-75 dark:firefox:bg-opacity-95 dark:bg-gray-900
			transition-transform
			ease-in-out
			duration-200
			translate-y-0
		"
		:class="{ 'ring-1 ring-black ring-opacity-10': pastLimit, '-translate-y-full': !isNavbarVisible }"
	>
		<button
			v-if="post"
			type="button"
			aria-label="Open navigation"
			@click="store.sideNavOpen = !store.sideNavOpen"
			class="
				flex
				2xl:hidden
				mr-6
				p-2
				rounded
				transition-colors
				duration-[50ms]
				text-gray-800
				dark:text-gray-100
				hover:text-primary-500
				dark:hover:text-primary-500
				focus:outline-none focus:ring-2
				ring-primary-500
			"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
			</svg>
		</button>
		<div v-if="post" class="flex 2xl:hidden bg-gray-400 w-full h-[1px] mr-6"></div>
		<!-- Home -->
		<router-link
			:to="{ name: 'index' }"
			aria-label="Go to home page"
			class="
				mr-6
				p-2
				rounded
				transition-colors
				duration-[50ms]
				text-gray-800
				dark:text-gray-100
				hover:text-primary-500
				dark:hover:text-primary-500
				focus:outline-none focus:ring-2
				ring-primary-500
			"
		>
			<i-heroicons-outline:code class="w-7 h-7" />
		</router-link>
		<!-- Toggle theme -->
		<div class="bg-gray-400 w-full h-[1px] mr-6"></div>
		<button
			type="button"
			aria-label="Toggle dark/light theme"
			@click="toggleDark()"
			class="
				mr-6
				p-2
				rounded
				transition-colors
				duration-[50ms]
				text-gray-800
				dark:text-gray-100
				hover:text-primary-500
				dark:hover:text-primary-500
				focus:outline-none focus:ring-2
				ring-primary-500
			"
		>
			<i-heroicons-outline:sun v-if="isDark" class="w-7 h-7" />
			<i-heroicons-outline:moon v-else class="w-7 h-7" />
		</button>
		<!-- Github -->
		<div class="bg-gray-400 w-full h-[1px] mr-6"></div>
		<a
			aria-label="View source"
			href="https://github.com/FallDownTheSystem/blog"
			target="_blank"
			rel="noopener noreferrer"
			class="
				p-2
				rounded
				transition-colors
				duration-[50ms]
				text-gray-800
				dark:text-gray-100
				hover:text-primary-500
				dark:hover:text-primary-500
				focus:outline-none focus:ring-2
				ring-primary-500
			"
		>
			<i-mdi:github class="w-7 h-7" />
		</a>
	</div>
	<div class="h-[8rem]"></div>
</template>

<script setup>
import store from '../../store';
import { useDark, useToggle, useWindowScroll } from '@vueuse/core';

const props = defineProps({
	post: {
		type: Boolean,
		default: false,
		requires: false
	}
});

// Theme toggle
const isDark = useDark();
const toggleDark = useToggle(isDark);

// Header hide/show
const SCROLL_LIMIT = 128;
const { y } = useWindowScroll();
const yp = ref(0);
const direction = ref('down');
const pastLimit = computed(() => y.value > SCROLL_LIMIT);
const isNavbarVisible = computed(() => (pastLimit.value && direction.value === 'up') || !pastLimit.value);

watch(
	() => y.value,
	() => {
		if (yp.value < y.value) {
			direction.value = 'down';
		} else {
			direction.value = 'up';
		}
		yp.value = y.value;
	}
);
</script>
