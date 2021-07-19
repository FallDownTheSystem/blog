<template>
	<div>
		Rendering an expression: {{ greeting }}
		<br />
		Expressions don't have to be variables:
		{{ 'Another' + ' expression' }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			greeting: 'Hello, world!'
		};
	}
};
</script>
