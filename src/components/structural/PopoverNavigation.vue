<template>
	<ClientOnly>
		<Transition
			enter-from-class="-translate-x-full"
			enter-active-class="transition ease-out duration-300"
			enter-to-class="translate-x-0"
			leave-from-class="translate-x-0"
			leave-active-class="transition ease-in duration-300"
			leave-to-class="-translate-x-full"
		>
			<div
				ref="target"
				v-bind="$attrs"
				v-show="store.sideNavOpen"
				class="
					fixed
					z-40
					inset-0
					transform
					w-screen
					max-w-[20rem]
					backdrop-filter backdrop-blur
					bg-white bg-opacity-75
					firefox:bg-opacity-95
					dark:bg-opacity-75 dark:firefox:bg-opacity-95 dark:bg-gray-900
					shadow-xl
					ring-1 ring-black ring-opacity-10
				"
			>
				<div class="h-24 flex items-center">
					<button
						@click="store.sideNavOpen = false"
						class="
							ml-6
							p-2
							rounded
							transition-colors
							duration-[50ms]
							text-gray-800
							dark:text-gray-100
							hover:text-primary-500
							dark:hover:text-primary-500
							focus:outline-none focus:ring-2
							ring-primary-500
						"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<SideNavigation :root="root" />
			</div>
		</Transition>
	</ClientOnly>
</template>

<script>
export default {
	inheritAttrs: false
};
</script>
<script setup>
import store from '../../store';
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const props = defineProps({
	root: {
		type: Object,
		required: false,
		default: null
	}
});

const target = ref(null);

const { hasFocus, activate, deactivate } = useFocusTrap(target);

// The button is in the SiteHeader, so let's watch for the change here and active the focus trap
// Rather than trying to pass the target ref or the method to over there
watchEffect(() => {
	if (store.sideNavOpen) {
		// Can't trap the focus because the element is hidden at the moment the button is clicked
		nextTick(() => {
			activate();
		});
	} else {
		deactivate();
	}
});

onClickOutside(target, event => {
	store.sideNavOpen = false;
	deactivate();
});

onKeyStroke('Escape', e => {
	e.preventDefault();
	store.sideNavOpen = false;
	deactivate();
});
</script>
