const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
let colors = require('tailwindcss/colors');

// Methods taken from tailwind typography plugin
const rem = px => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;
const round = n =>
	n
		.toFixed(7)
		.replace(/(\.[0-9]+?)0+$/, '$1')
		.replace(/\.0$/, '');

module.exports = {
	content: ['./index.html', './vite.config.js', './src/**/*.{js,vue,md}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray: {
					50: 'hsl(210, 28%, 98%)',
					100: 'hsl(220, 22%, 96%)',
					200: 'hsl(220, 17%, 91%)',
					300: 'hsl(216, 15%, 84%)',
					400: 'hsl(218, 11%, 65%)',
					500: 'hsl(220, 8%, 46%)',
					600: 'hsl(215, 9%, 34%)',
					700: 'hsl(217, 11%, 25%)',
					800: 'hsl(215, 11%, 17%)',
					900: 'hsl(218, 12%, 11%)'
				},
				primary: colors.purple,
				// Background color of syntax highlighted code blocks
				// Set these to the color of the theme you use, or a custom one
				code: '#ffffff',
				'code-dark': 'hsl(215, 11%, 14%)'
			},
			// Override the default 2xl breakpoint
			// to better fit the blog width + side navigation
			screens: {
				'2xl': '1600px'
			},
			fontFamily: {
				// https://fonts.google.com/specimen/Public+Sans
				// Loaded in index.html
				sans: ["'Public Sans'", ...defaultTheme.fontFamily.sans],
				// Playfair Display is not suited for small text
				// so replace this if you intend to use serif on body text or even regular sized headings
				// https://fonts.google.com/specimen/Playfair+Display
				// Loaded in index.html
				serif: ["'Playfair Display'", ...defaultTheme.fontFamily.serif],
				// https://github.com/microsoft/cascadia-code
				mono: ["'Cascadia Code'", ...defaultTheme.fontFamily.mono]
			},
			// See https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js for default config
			typography: theme => ({
				DEFAULT: {
					css: [
						{
							maxWidth: 'none',
							a: {
								color: theme('colors.primary.500', colors.indigo[500]),
								textDecoration: 'none',
								fontWeight: '500',
								'&:hover': {
									textDecoration: 'underline'
								},
								strong: {
									color: theme('colors.primary.500', colors.indigo['500'])
								}
							},
							sub: {
								lineHeight: '1.25'
							},
							sup: {
								lineHeight: '1.25'
							},
							'ol > li::before': {
								color: 'hsla(0, 0%, 0%, 0.25)'
							},
							'ul > li::before': {
								backgroundColor: 'hsla(0, 0%, 0%, 0.25)'
							},
							h1: {
								fontWeight: '600'
							},
							h2: {
								fontWeight: '600'
							},
							h3: {
								fontWeight: '600'
							},
							h4: {
								fontWeight: '600'
							},
							code: {
								// Cascadia code is a fat font, so using a lower font weight
								fontWeight: '350'
							},
							':not(pre)>code': {
								paddingTop: '0.125rem',
								paddingBottom: '0.125rem',
								paddingRight: '0.25rem',
								paddingLeft: '0.25rem',
								background: 'hsla(0, 0%, 0%, 0.075)',
								borderRadius: '0.2rem',
								overflowWrap: 'break-word'
							},
							'code::before': {
								content: ''
							},
							'code::after': {
								content: ''
							},
							'a code': {
								color: theme('colors.primary.500', colors.indigo[500])
							},
							pre: {
								backgroundColor: theme('colors.code', colors.gray[200])
							},
							'pre code': {
								// Cascadia code is a fat font, so using a lower font weight
								fontWeight: '350'
							}
						},
						{
							fontSize: rem(18),
							lineHeight: round(32 / 18),
							p: {
								marginTop: em(24, 18),
								marginBottom: em(24, 18)
							},
							'[class~="lead"]': {
								fontSize: em(22, 18),
								lineHeight: round(32 / 22),
								marginTop: em(24, 22),
								marginBottom: em(24, 22)
							},
							blockquote: {
								marginTop: em(40, 24),
								marginBottom: em(40, 24),
								paddingLeft: em(24, 24)
							},
							h1: {
								fontSize: em(48, 18),
								marginBottom: em(40, 48),
								lineHeight: round(48 / 44)
							},
							h2: {
								fontSize: em(30, 18),
								marginTop: em(56, 30),
								marginBottom: em(32, 30),
								lineHeight: round(40 / 30)
							},
							h3: {
								fontSize: em(24, 18),
								marginTop: em(40, 24),
								marginBottom: em(16, 24),
								lineHeight: round(36 / 24)
							},
							h4: {
								marginTop: em(32, 18),
								marginBottom: em(8, 18),
								lineHeight: round(28 / 18)
							},
							img: {
								marginTop: em(32, 18),
								marginBottom: em(32, 18)
							},
							video: {
								marginTop: em(32, 18),
								marginBottom: em(32, 18)
							},
							figure: {
								marginTop: em(32, 18),
								marginBottom: em(32, 18)
							},
							'figure figcaption': {
								fontSize: em(16, 18),
								lineHeight: round(24 / 16),
								marginTop: em(16, 16)
							},
							code: {
								fontSize: em(16, 18)
							},
							'h2 code': {
								fontSize: em(26, 30)
							},
							'h3 code': {
								fontSize: em(21, 24)
							},
							pre: {
								fontSize: em(16, 18),
								lineHeight: round(28 / 16),
								marginTop: em(32, 16),
								marginBottom: em(32, 16),
								borderRadius: rem(6),
								paddingTop: em(16, 16),
								paddingRight: em(24, 16),
								paddingBottom: em(16, 16),
								paddingLeft: em(24, 16)
							},
							ol: {
								marginTop: em(24, 18),
								marginBottom: em(24, 18)
							},
							ul: {
								marginTop: em(24, 18),
								marginBottom: em(24, 18)
							},
							li: {
								marginTop: em(12, 18),
								marginBottom: em(12, 18)
							},
							'ol > li': {
								paddingLeft: em(30, 18)
							},
							'ul > li': {
								paddingLeft: em(30, 18)
							},
							'ul > li::before': {
								width: em(6, 18),
								height: em(6, 18),
								top: `calc(${em(32 / 2, 18)} - ${em(3, 18)})`,
								left: em(4, 18)
							},
							'> ul > li p': {
								marginTop: em(16, 18),
								marginBottom: em(16, 18)
							},
							'> ul > li > *:first-child': {
								marginTop: em(24, 18)
							},
							'> ul > li > *:last-child': {
								marginBottom: em(24, 18)
							},
							'> ol > li > *:first-child': {
								marginTop: em(24, 18)
							},
							'> ol > li > *:last-child': {
								marginBottom: em(24, 18)
							},
							'ul ul, ul ol, ol ul, ol ol': {
								marginTop: em(16, 18),
								marginBottom: em(16, 18)
							},
							hr: {
								marginTop: em(56, 18),
								marginBottom: em(56, 18)
							},
							table: {
								fontSize: em(16, 18),
								lineHeight: round(24 / 16)
							},
							'thead th': {
								paddingRight: em(12, 16),
								paddingBottom: em(12, 16),
								paddingLeft: em(12, 16)
							},
							'tbody td': {
								paddingTop: em(12, 16),
								paddingRight: em(12, 16),
								paddingBottom: em(12, 16),
								paddingLeft: em(12, 16)
							}
						}
					]
				},
				dark: {
					css: [
						{
							color: theme('colors.gray.200', colors.gray[200]),
							'[class~="lead"]': {
								color: theme('colors.gray.400', colors.gray[400])
							},
							a: {
								color: theme('colors.primary.500', colors.indigo[500]),
								strong: {
									color: theme('colors.primary.500', colors.indigo[500])
								}
							},
							strong: {
								color: theme('colors.gray.100', colors.gray[100])
							},
							sub: {
								color: theme('colors.gray.200', colors.gray[200])
							},
							sup: {
								color: theme('colors.gray.200', colors.gray[200])
							},
							'ol > li::before': {
								color: 'hsla(0, 0%, 100%, 0.4)'
							},
							'ul > li::before': {
								backgroundColor: 'hsla(0, 0%, 100%, 0.4)'
							},
							hr: {
								borderColor: theme('colors.gray.800', colors.gray[800])
							},
							blockquote: {
								color: theme('colors.gray.200', colors.gray[200]),
								borderLeftColor: theme('colors.gray.700', colors.gray[700])
							},
							h1: {
								color: theme('colors.white', colors.white),
								fontWeight: '600'
							},
							h2: {
								color: theme('colors.gray.100', colors.gray[100]),
								fontWeight: '600'
							},
							h3: {
								color: theme('colors.gray.100', colors.gray[100]),
								fontWeight: '600'
							},
							h4: {
								color: theme('colors.gray.100', colors.gray[100]),
								fontWeight: '600'
							},
							'figure figcaption': {
								color: theme('colors.gray.400', colors.gray[400])
							},
							code: {
								color: theme('colors.gray.100', colors.gray[100])
							},
							':not(pre)>code': {
								background: 'hsla(210, 80%, 80%, 0.075)'
							},
							'a code': {
								color: theme('colors.primary.500', colors.indigo[500])
							},
							pre: {
								color: theme('colors.gray.200', colors.gray[200]),
								backgroundColor: theme('colors.code-dark', colors.gray[800])
							},
							thead: {
								color: theme('colors.gray.100', colors.gray[100]),
								borderBottomColor: theme('colors.gray.700', colors.gray[700])
							},
							'tbody tr': {
								borderBottomColor: theme('colors.gray.800', colors.gray[800])
							}
						}
					]
				}
			})
		}
	},
	// With Tailwind JIT all variants are enabled, but a plugin might need to explicitly enable variants still
	variants: {
		extend: {}
	},
	plugins: [
		// https://github.com/tailwindlabs/tailwindcss-typography
		// Disabling the size modifiers
		require('@tailwindcss/typography')({ modifiers: [] }),
		//https://github.com/tailwindlabs/tailwindcss-forms
		require('@tailwindcss/forms'),
		// Adds a firefox variant, used for a custom background opacity in the header and side nav
		// Because firefox doesn't support background filter blur yet.
		plugin(function ({ addVariant, e, postcss }) {
			addVariant('firefox', ({ container, separator }) => {
				const isFirefoxRule = postcss.atRule({
					name: '-moz-document',
					params: 'url-prefix()'
				});
				isFirefoxRule.append(container.nodes);
				container.append(isFirefoxRule);
				isFirefoxRule.walkRules(rule => {
					rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`;
				});
			});
		})
	]
};
