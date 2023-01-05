import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export function markdownRemarkExtract() {
	return function (tree, file) {
		let excerptValue = ''



		if (file.value.indexOf('<!-- excerpt -->') !== -1) {
			excerptValue = file.value.slice(
				0,
				file.value.indexOf("<!-- excerpt -->")
			)
		}

		unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify).process(excerptValue)
			.then(res => file.data.astro.frontmatter.excerpt = res.value)


	}
}