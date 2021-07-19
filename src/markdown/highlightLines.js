// Modified from https://github.com/egoist/markdown-it-highlight-lines

const RE = /{([\d,-]+)}/;
const wrapperRE = /^<pre .*?><code>/;

export const highlightLinePlugin = md => {
	const fence = md.renderer.rules.fence;
	md.renderer.rules.fence = (...args) => {
		const [tokens, idx, options] = args;
		const token = tokens[idx];
		const rawInfo = token.info;

		const langName = rawInfo.replace(RE, '').replace('ln', '').trim();
		token.lineNumbers = rawInfo.replace(RE, '').replace(langName, '').trim() === 'ln';
		token.info = langName;

		if (!rawInfo || !RE.test(rawInfo)) {
			return fence(...args);
		}

		// ensure the next plugin get the correct lang.

		const lineNumbers = RE.exec(rawInfo)[1]
			.split(',')
			.map(v => v.split('-').map(v => parseInt(v, 10)));

		const code = options.highlight ? options.highlight(token.content, langName) : token.content;

		const rawCode = code.replace(wrapperRE, '');
		const highlightLinesCode = rawCode
			.split('\n')
			.map((split, index) => {
				const lineNumber = index + 1;
				const inRange = lineNumbers.some(([start, end]) => {
					if (start && end) {
						return lineNumber >= start && lineNumber <= end;
					}
					return lineNumber === start;
				});
				if (inRange) {
					return `<div class="highlighted">&nbsp;</div>`;
				}
				return '<br>';
			})
			.join('');

		const highlightLinesWrapperCode = `<div class="highlight-lines">${highlightLinesCode}</div>`;

		return highlightLinesWrapperCode + code;
	};
};
