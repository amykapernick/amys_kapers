import { defineCollection } from 'astro:content';

const workshopCollection = defineCollection({
	type: 'content'
});

export const collections = {
	'workshop': workshopCollection,
};