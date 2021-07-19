<template>
	<div class="flex content-center items-center p-8 space-x-8">
		<router-link :to="{ name: 'index' }" class="text-gray-50 hover:text-pink-600 focus:text-pink-600 focus:outline-none">
			<i-heroicons-outline:code class="w-7 h-7" />
		</router-link>
		<div class="bg-gray-400 w-full h-[1px]"></div>
		<p class="min-w-max text-white">(•‿•)ﾉ Hi!</p>
		<div class="bg-gray-400 w-full h-[1px]"></div>
		<a
			href="https://github.com/FallDownTheSystem/blog"
			target="_blank"
			rel="noopener noreferrer"
			class="text-gray-50 hover:text-pink-600 focus:text-pink-600 focus:outline-none"
		>
			<i-mdi:github class="w-7 h-7" />
		</a>
	</div>
</template>

<script setup></script>

<style scoped></style>
