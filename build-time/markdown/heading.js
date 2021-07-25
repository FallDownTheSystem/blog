/**
 * Adds group and relative classes to headings.
 * Used to add a group hover effect.
 */
export const modifyHeading = md => {
	md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
		const token = tokens[i];
		if (['h1', 'h2', 'h3', 'h4'].includes(token.tag)) {
			token.attrPush(['class', 'group relative focus:outline-none']);
		}
		return self.renderToken(tokens, i, options);
	};
};
