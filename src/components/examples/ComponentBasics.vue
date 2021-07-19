<template>
	<div class="space-y-8">
		<NewsArticle v-for="article in articles" :title="article.title" @article-saved="onSaved($event, article)" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [{ title: 'The first news article' }, { title: 'The second news article' }, { title: 'The third news article' }]
		};
	},
	methods: {
		onSaved(event, article) {
			article.title = event.newTitle;
		}
	}
};
</script>
