<template>
	<!-- Post = false means side navigation button isn't shown -->
	<SiteHeader :post="false" />
	<main>
		<!-- Right side has less margin because the scrollbar already takes some space -->
		<div class="flex flex-col items-center content-center mx-2 md:mx-0 md:ml-2 md:mr-0">
			<router-view />
		</div>
	</main>
</template>
