import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '@/lib/site';

export async function GET(context: APIContext) {
    const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    );

    return rss({
        title: `${site.fullName} — Blog`,
        description: site.description,
        // context.site sudah menyertakan base deployment.
        site: context.site ?? site.url,
        trailingSlash: true,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description ?? '',
            pubDate: post.data.date,
            categories: post.data.tags,
            link: `/blog/${post.id}/`,
        })),
        customData: '<language>id-ID</language>',
    });
}
