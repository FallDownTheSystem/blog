<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div class="absolute left-0 bottom-0 h-[calc(100vh-6rem)] w-[20rem]">
		<Transition
			appear
			enter-from-class="opacity-0 -translate-x-64"
			enter-active-class="delay-200"
			enter-to-class="opacity-100 translate-x-0"
		>
			<nav ref="scrollTarget" class="fade-y flex h-[calc(100vh-6rem)] pl-4 overflow-y-scroll scroll-hide transition-all duration-300 fixed">
				<ol class="space-y-3 my-auto py-8">
					<li>
						<router-link :to="{ name: 'index' }" class="flex outline-none items-center group">
							<LeftArrow
								class="
									h-5
									w-5
									text-gray-500
									group-hover:text-gray-800
									group-focus:text-gray-800
									dark:text-gray-400 dark:group-hover:text-gray-200 dark:group-focus:text-gray-200
								"
							/>
							<span
								class="
									font-medium
									text-sm
									ml-3
									w-[14rem]
									truncate
									text-gray-500
									group-hover:text-gray-800
									group-focus:text-gray-800
									dark:text-gray-400 dark:group-hover:text-gray-200 dark:group-focus:text-gray-200
								"
								>Home</span
							>
						</router-link>
					</li>
					<li v-for="h in headingRef" :key="h.hash">
						<a
							:href="h.hash"
							class="flex outline-none items-center group"
							:class="{ 'ml-3': h.type == 'H3', 'ml-6': h.type == 'H4' }"
							aria-current="step"
							ref="currentStep"
							v-if="current == h.hash"
						>
							<span class="flex flex-shrink-0 h-5 w-5 relative items-center justify-center" aria-hidden="true">
								<span
									class="rounded-full bg-primary-200 dark:bg-primary-900 absolute group-hover:animate-ping"
									:class="{ 'h-4 w-4': h.type == 'H2' || h.type == 'H1', 'h-3 w-3': h.type == 'H3', 'h-2 w-2': h.type == 'H4' }"
								></span>

								<span
									class="rounded-full relative block bg-primary-500 dark:bg-primary-500"
									:class="{
										'w-2 h-2': h.type == 'H2' || h.type == 'H1',
										'w-1.5 h-1.5': h.type == 'H3',
										'w-1 h-1': h.type == 'H4'
									}"
								></span>
							</span>
							<span class="font-medium text-sm ml-3 max-w-[15rem] truncate text-primary-500 dark:text-primary-500 group-focus:underline">
								{{ h.title }}
							</span>
						</a>
						<a
							:href="h.hash"
							class="flex outline-none items-center group"
							:class="{ 'ml-3': h.type == 'H3', 'ml-6': h.type == 'H4' }"
							v-else
						>
							<span class="flex flex-shrink-0 h-5 w-5 relative items-center justify-center" aria-hidden="true">
								<span
									class="
										rounded-full
										absolute
										bg-gray-500
										group-hover:bg-gray-800
										group-focus:bg-gray-800
										dark:bg-gray-400 dark:group-hover:bg-gray-200 dark:group-focus:bg-gray-200
										group-hover:animate-ping
									"
									:class="{
										'w-2 h-2': h.type == 'H2' || h.type == 'H1',
										'w-1.5 h-1.5': h.type == 'H3',
										'w-1 h-1': h.type == 'H4'
									}"
								></span>
								<span
									class="
										rounded-full
										relative
										block
										bg-gray-500
										group-hover:bg-gray-800
										group-focus:bg-gray-800
										dark:bg-gray-400 dark:group-hover:bg-gray-200 dark:group-focus:bg-gray-200
									"
									:class="{
										'w-2 h-2': h.type == 'H2' || h.type == 'H1',
										'w-1.5 h-1.5': h.type == 'H3',
										'w-1 h-1': h.type == 'H4'
									}"
								></span>
							</span>
							<span
								class="
									font-medium
									text-sm
									ml-3
									max-w-[15rem]
									truncate
									text-gray-500
									group-hover:text-gray-800
									group-focus:text-gray-800
									dark:text-gray-400 dark:group-hover:text-gray-200 dark:group-focus:text-gray-200
								"
							>
								{{ h.title }}
							</span>
						</a>
					</li>
				</ol>
			</nav>
		</Transition>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import sortBy from 'lodash/sortBy';
import store from '../../store';

const props = defineProps({
	root: {
		type: Object,
		required: false,
		default: null
	}
});

/** @type {{ hash: string, type: string, pos: number, title: string }[]} */
const headingRef = ref([]);
const current = ref('#');
const currentStep = ref(null);
const scrollTarget = ref(null);

/** @param {HTMLElement} x */
const parseHeading = x => {
	const title = x.innerText.replace('#', '').trim();
	const obj = { title, hash: x.children[0]?.hash ?? '#', type: x.tagName, pos: x.getBoundingClientRect().top + window.scrollY };
	return obj;
};

watch([() => store.mounted, () => props.root], (prev, next) => {
	if (props.root) {
		headingRef.value = [...props.root.querySelectorAll('h1, h2, h3')].filter(x => x.closest('.slides') == null).map(x => parseHeading(x));
	}
});

const isVisible = function (ele, container) {
	if (!ele || !container) {
		return false;
	}
	const { bottom, height, top } = ele.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return top <= containerRect.top ? containerRect.top - top <= height : bottom - containerRect.bottom <= height;
};

const debounceScroll = useDebounceFn(() => {
	for (const heading of headingRef.value) {
		// Set as current when the position is slightly above the middle of the screen
		if (heading.pos < window.scrollY + window.innerHeight / 2.1) {
			current.value = heading.hash;
		} else {
			break;
		}
	}

	// Wait a tick so that currentStep is up to date
	nextTick(() => {
		// Add automatic scrolling to side nav (useful when the side nav is so long it becomes scrollable)
		const targetIsVisible = isVisible(currentStep.value, scrollTarget.value);
		if (!targetIsVisible) {
			if (typeof currentStep?.value?.scrollIntoView === 'function') {
				currentStep.value.scrollIntoView({ block: 'center', behavior: 'smooth' });
			}
		}
	});
}, 100);

onMounted(() => {
	// The scrolling has to be debounced
	// otherwise it will scroll the side navigation when the main content is scrolling, causing the actual scroll to cancel.
	document.addEventListener('scroll', debounceScroll);
});
</script>

<style scoped>
.fade-y {
	mask-image: linear-gradient(0deg, transparent 0%, black 5%, black 95%, transparent 100%);
}
</style>
