import { usePrepareRequest } from '~~/utils/usePrepareRequest';

export default defineCachedEventHandler(
    async (event) => {
        const { url, requestOptions } = await usePrepareRequest(event);

        try {
            return await $fetch(url, requestOptions);
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
