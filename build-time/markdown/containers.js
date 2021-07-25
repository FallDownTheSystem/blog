import container from 'markdown-it-container';

/* Custom container
https://github.com/markdown-it/markdown-it-container
*/

const parseArgs = (name, info) => {
	const re = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g;
	const args = [...info.trim().slice(name.length).trim().matchAll(re)].map(x => x[0].replaceAll(/^['"]|['"]$/g, '')).reverse();
	return args;
};

// Keeping track of nested tags in an array
let tags = [];

const createAlert = type => [
	container,
	type,
	{
		render(tokens, idx) {
			const { info, nesting } = tokens[idx];

			let args = parseArgs(type, info);
			const tag = 'Alert';

			const props = {
				title: args.length ? args.pop() : type.toUpperCase(),
				type: type
			};

			if (nesting === 1) {
				tags.push(tag);
				return `<${tag} v-bind='${JSON.stringify(props)}'>`;
			} else {
				return `</${tags.pop()}>`;
			}
		}
	}
];

export const containerPlugin = md => {
	md.use(container, 'tag', {
		render(tokens, idx) {
			const { info, nesting } = tokens[idx];
			let args = parseArgs('tag', info);
			let pre = false;
			let classes = [];
			let props = {};
			let tag = args.length ? args.pop() : 'div';
			while (args.length > 0) {
				const arg = args.pop();
				switch (arg) {
					case 'v-pre':
						pre = true;
						break;
					default:
						classes.push(arg);
						break;
				}
			}
			if (nesting === 1) {
				tags.push(tag);
				const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
				return `<${tag}${pre ? ' v-pre' : ''}${classAttr}>`;
			} else {
				return `</${tags.pop()}>`;
			}
		}
	});

	md.use(container, 'more', {
		render(tokens, idx) {
			const { info, nesting } = tokens[idx];
			let tag = 'More';
			if (nesting === 1) {
				tags.push(tag);
				return `<${tag}>`;
			} else {
				return `</${tags.pop()}>`;
			}
		}
	});

	md.use(...createAlert('note'));
	md.use(...createAlert('info'));
	md.use(...createAlert('tip'));
	md.use(...createAlert('warn'));
	md.use(...createAlert('danger'));
};
