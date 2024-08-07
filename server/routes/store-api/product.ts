import { usePrepareRequest } from '~~/utils/usePrepareRequest';

export default defineCachedEventHandler(
    async (event) => {
        const { url, requestOptions } = await usePrepareRequest(event);

        try {
            const response = await $fetch(url, requestOptions);
            setResponseHeader(
                event,
                'Vercel-CDN-Cache',
                `max-age=${60 * 1 * 60}`,
            );
            setResponseHeader(
                event,
                'CDN-Cache-Control',
                `max-age=${60 * 1 * 60}`,
            );
            return response;
        } catch (err) {
            throw createError(err);
        }
    },
    {
        maxAge: 60 * 1 * 60,
        swr: true,
        varies: ['sw-access-key', 'sw-language-id'],
    },
);
