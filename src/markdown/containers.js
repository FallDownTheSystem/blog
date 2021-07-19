import container from 'markdown-it-container';

export const containerPlugin = md => {
	md.use(...createContainer('c'));
};

let tags = [];

function createContainer(name) {
	return [
		container,
		name,
		{
			render(tokens, idx) {
				const { info, nesting } = tokens[idx];
				const re = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g;
				const args = [...info.trim().slice(name.length).trim().matchAll(re)].map(x => x[0].replaceAll(/^['"]|['"]$/g, '')).reverse();
				let pre = false;
				let classes = [];
				let props = {};
				let tag = 'div';

				while (args.length > 0) {
					const arg = args.pop();
					switch (arg) {
						case 'v-pre':
							pre = true;
							break;
						case 'tag':
							if (args.length > 0) {
								tag = args.pop();
							}
							break;
						case 'info':
						case 'note':
						case 'danger':
						case 'warn':
						case 'tip': {
							tag = 'Alert';
							if (args.length > 0) {
								props.title = args.pop();
							}
							props.type = arg;
							classes.push(arg);
							break;
						}
						default:
							classes.push(arg);
							break;
					}
				}

				if (nesting === 1) {
					tags.push(tag);
					const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
					return `<${tag}${pre ? ' v-pre' : ''} v-bind='${JSON.stringify(props)}'${classAttr}>`;
				} else {
					return `</${tags.pop()}>`;
				}
			}
		}
	];
}
