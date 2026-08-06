import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
    docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),

    writing: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date(),
            tags: z.array(z.string()).default([]),
            draft: z.boolean().default(false),
        }),
    }),

    portfolio: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            category: z.string().default('Karya'),
            date: z.coerce.date(),
            img: z.string().optional(),
            link: z.string().optional(),
            draft: z.boolean().default(false),
        }),
    }),

    teaching: defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/teaching' }),
        schema: z.object({
            title: z.string(),
            code: z.string().optional(),
            semester: z.string().optional(),
            description: z.string().optional(),
            type: z.enum(['Mata Kuliah', 'Workshop']).default('Mata Kuliah'),
            draft: z.boolean().default(false),
        }),
    }),
};
