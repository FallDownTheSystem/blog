import { remove } from 'diacritics';
// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;

export const slugify = str => {
	if (!str) {
		return '';
	}
	return (
		remove(str)
			// Remove control characters
			.replace(rControl, '')
			// Replace special characters
			.replace(rSpecial, '-')
			// Remove continuous separators
			.replace(/\-{2,}/g, '-')
			// Remove prefixing and trailing separators
			.replace(/^\-+|\-+$/g, '')
			// ensure it doesn't start with a number
			.replace(/^(\d)/, '_$1')
			// lowercase
			.toLowerCase()
	);
};
