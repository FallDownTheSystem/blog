import { reactive } from 'vue';

// Global state store
const store = reactive({
	sideNavOpen: false,
	mounted: 0
});

export default store;
