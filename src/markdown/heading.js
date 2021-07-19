export const modifyHeading = md => {
	md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
		const token = tokens[i];
		if (['h1', 'h2', 'h3', 'h4'].includes(token.tag)) {
			token.attrPush(['class', 'group relative']);
		}
		return self.renderToken(tokens, i, options);
	};
};
