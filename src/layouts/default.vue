<template>
	<SiteHeader />
	<Transition
		appear
		enter-from-class="opacity-0 -translate-x-64"
		enter-active-class="delay-200"
		enter-to-class="opacity-100 translate-x-0"
	>
		<nav
			class="text-white transform pl-4 transition-all top-1/2 -translate-y-1/2 duration-300 hidden full:flex justify-center fixed"
			aria-label="Progress"
		>
			<ol class="space-y-4">
				<li>
					<router-link
						:to="{ name: 'index' }"
						class="flex outline-none items-center group"
						aria-current="step"
					>
						<i-tabler:arrow-narrow-left
							class="h-5 text-gray-500 w-5 group-hover:text-gray-300 group-focus:text-gray-300"
						/>
						<span
							class="font-medium text-sm ml-3 text-gray-500 w-56 truncate group-hover:text-gray-300 group-focus:text-gray-300"
						>Home</span>
					</router-link>
				</li>
				<li v-for="h in headings" :key="h.hash">
					<!-- Current Step -->
					<a
						:href="h.hash"
						class="flex outline-none items-center group"
						:class="{ 'ml-3': h.type == 'H3', 'ml-6': h.type == 'H4' }"
						aria-current="step"
					>
						<span
							class="flex flex-shrink-0 h-5 w-5 relative items-center justify-center"
							aria-hidden="true"
						>
							<span
								v-if="current == h.hash"
								class="rounded-full bg-pink-900 absolute"
								:class="{ 'h-4 w-4': h.type == 'H2' || h.type == 'H1', 'h-3 w-3': h.type == 'H3', 'h-2 w-2': h.type == 'H4' }"
							></span>
							<span
								class="rounded-full relative block"
								:class="{
									'w-2 h-2': h.type == 'H2' || h.type == 'H1',
									'w-1.5 h-1.5': h.type == 'H3',
									'w-1 h-1': h.type == 'H4',
									'bg-pink-600': current == h.hash,
									'bg-gray-500 group-hover:bg-gray-300 group-focus:bg-gray-300': current != h.hash
								}"
							></span>
						</span>
						<span
							class="font-medium text-sm ml-3 w-56 truncate"
							:class="{
								'text-pink-600 group-focus:underline': current == h.hash,
								'text-gray-500 group-hover:text-gray-300 group-focus:text-gray-300': current != h.hash
							}"
						>{{ h.title }}</span>
					</a>
				</li>
			</ol>
		</nav>
	</Transition>

	<main ref="root">
		<div id="content" class="flex flex-col items-center content-center">
			<router-view @mounted="handleMounted" />
		</div>
	</main>
	<ArticleNavigation :articleNav="articleNav" class="mt-64" />
	<SiteFooter />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { sortBy } from 'lodash-es';

ref: headings = [];
ref: current = '#';
ref: articleNav = { prev: null, next: null };

const root = ref(null);
const router = useRouter();
const route = useRoute();

const parseHeading = x => {
	const title = x.innerText.replace('#', '').trim();
	const obj = { title, hash: x.children[0]?.hash ?? '#', type: x.tagName, pos: x.getBoundingClientRect().top + window.scrollY };
	return obj;
};

const handleMounted = () => {
	// Side nav
	headings = [...root.value.querySelectorAll('h1, h2, h3')].filter(x => x.closest('.slides') == null).map(x => parseHeading(x));

	// Bottom nav
	const currentRoute = route.matched.find(x => x.path !== '/');
	const articles = sortBy(
		router.getRoutes().filter(x => x.path !== '/' && x.name !== 'all' && x.name),
		'meta.order'
	);
	if (articles && currentRoute) {
		const index = articles.findIndex(x => x.path == currentRoute.path);
		articleNav.next = index < articles.length - 1 ? articles[index + 1] : null;
		articleNav.prev = index > 0 ? articles[index - 1] : null;
	}
};

onMounted(() => {
	document.addEventListener('scroll', function(e) {
		for (const heading of headings) {
			if (heading.pos < window.scrollY + window.innerHeight / 2.1) {
				current = heading.hash;
			} else {
				break;
			}
		}
	});
});
</script>
