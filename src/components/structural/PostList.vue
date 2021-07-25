<template>
	<div class="flex flex-col space-y-4 items-start">
		<router-link
			v-for="link in articles"
			:to="{ name: link.name }"
			class="
				group
				w-full
				py-6
				px-8
				rounded-xl
				hover:bg-gray-100
				focus:bg-gray-100
				text-gray-700
				dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:text-gray-100
				focus:outline-none focus:ring-2
				ring-primary-500 ring-offset-4 ring-offset-white
				dark:ring-offset-gray-900
			"
		>
			<div class="flex items-center content-center justify-between space-x-12">
				<div>
					<h2 class="text-[2rem] font-serif font-bold tracking-wide mb-2">{{ link?.meta?.name ?? link?.meta?.title ?? link.name }}</h2>
					<p v-if="config.description && link?.meta?.description" class="italic text-gray-600 dark:text-gray-300 w-full max-w-[32rem]">
						{{ link?.meta?.description }}
					</p>
					<p
						v-if="config.date && link?.meta?.date"
						class="
							text-sm
							font-medium
							text-gray-500
							group-hover:text-gray-600
							group-focus:text-gray-600
							dark:text-gray-500 dark:group-hover:text-gray-400 dark:group-focus:text-gray-400
							mt-2
						"
					>
						{{ new Date(link?.meta?.date)?.toLocaleDateString() }}
					</p>
					<span
						v-if="config.tags && link?.meta?.tags"
						v-for="tag in link?.meta?.tags"
						class="
							inline-flex
							items-center
							px-2.5
							py-0.5
							rounded-full
							text-xs
							font-medium
							mr-2
							mt-2
							bg-gray-100
							group-hover:bg-gray-200
							text-gray-700
							group-hover:text-gray-800
							dark:bg-gray-800 dark:group-hover:bg-gray-700 dark:text-gray-200 dark:group-hover:text-gray-100
						"
					>
						{{ tag }}</span
					>
				</div>
				<RightArrow
					class="
						w-8
						h-8
						text-gray-400
						group-hover:text-gray-500
						group-focus:text-gray-500
						dark:text-gray-600 dark:group-hover:text-gray-400 dark:group-focus:text-gray-300
					"
				/>
			</div>
		</router-link>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import sortBy from 'lodash/sortBy';

const config = {
	description: true,
	date: true,
	tags: false
};

const router = useRouter();
const routes = router.getRoutes();
const articles = sortBy(
	routes.filter(x => x.name && x.meta && x.path !== '/' && x.name !== 'all'),
	'meta.date'
).reverse();
</script>
