import {defineCollection, defineContentConfig, z} from '@nuxt/content';

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            source: 'blog/*.md',
            type: 'page',
            // Define custom schema for docs collection
            schema: z.object({
                headerImg: z.string(),
                previewImg: z.string(),
                tags: z.array(z.string()),
                repositoryUrl: z.string(),
                order: z.number(),
            })
        }),
        portfolio: defineCollection({
            source: 'portfolio/*.md',
            type: 'page',
            // Define custom schema for docs collection
            schema: z.object({
                headerImg: z.string(),
                previewImg: z.string(),
                tags: z.array(z.string()),
                repositoryUrl: z.string(),
                order: z.number(),
            })
        }),
    }
});