<template>
	<div>
		<p class="text-2xl font-medium !-mb-2">{{ title }}</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		<button type="button" class="bg-gray-700 px-4 py-1 rounded mt-2 hover:bg-gray-600" @click="saveArticle">
			<span>{{ savedText }} <span class="text-red-500">♥</span></span>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		title: String
	},
	data() {
		return {
			read: false
		};
	},
	methods: {
		saveArticle() {
			if (!this.read) {
				this.$emit('article-saved', { newTitle: this.title + ' (read)' });
			}
			this.read = true;
		}
	},
	computed: {
		savedText() {
			return this.read ? 'Saved' : 'Save';
		}
	}
};
</script>
