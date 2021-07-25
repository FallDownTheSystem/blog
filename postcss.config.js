module.exports = {
	// Vite is pre-configured to support CSS @import inlining via postcss-import, so no need to add it here manually
	plugins: [require('tailwindcss/nesting'), require('tailwindcss'), require('autoprefixer')]
};
