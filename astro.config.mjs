import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import rehypeFigure from './src/utils/rehypeFigure';

export default defineConfig({
	site: 'https://amyskapers.dev',
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
			'remark-squeeze-paragraphs'
		],
		extendDefaultPlugins: true,
	},
	integrations: [sitemap(), image()]
});