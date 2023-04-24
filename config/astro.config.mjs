import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import rehypeFigure from '../src/utils/rehypeFigure';
import { markdownRemarkExtract } from '../src/utils/markdownExcerpt';

export default defineConfig({
	site: 'https://amyskapers.dev',
	vite: {
		css: {
			postcss: `./config`
		}
	},
	markdown: {
		syntaxHighlight: 'prism',
		rehypePlugins: [
			'rehype-external-links',
			[rehypeFigure, { allImages: true, useTitle: true }],
			'rehype-picture'
		],
		remarkPlugins: [
			['remark-oembed', { syncWidget: true, asyncImg: true }],
			'remark-hint',
			'remark-squeeze-paragraphs',
			markdownRemarkExtract
		],
		extendDefaultPlugins: true,
	},
	integrations: [sitemap(), image()]
});  