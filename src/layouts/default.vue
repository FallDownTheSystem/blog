<template>
	<!-- post = true means open side navigation button is shown -->
	<SiteHeader :post="true" />
	<!-- Popover navigation -->
	<PopoverNavigation class="flex 2xl:hidden" :root="root" />
	<!-- Wide screen fixed navigation -->
	<SideNavigation class="hidden 2xl:flex" :root="root" />
	<!-- Right side has less margin because the scrollbar already takes some space -->
	<main ref="root" class="flex flex-col items-center content-center mx-2 md:mx-0 md:ml-2 md:mr-0">
		<router-view />
	</main>
	<ArticleNavigation class="mt-48 mb-12" />
</template>

<script setup>
// Used to track the headings in the post, for generating the side navigation
const root = ref(null);
</script>
