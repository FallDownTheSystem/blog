fs = require('fs');
const matter = require('gray-matter');

// Read markdown files and extract frontmatter
export default function metaResolver(path) {
	const file = fs.readFileSync(path, 'utf8');
	const meta = matter(file);
	return meta.data;
}
