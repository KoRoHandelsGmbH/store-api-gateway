import { usePrepareRequest } from '~~/utils/usePrepareRequest';

export default defineCachedEventHandler(
    async (event) => {
        const { url, requestOptions } = await usePrepareRequest(event);

        try {
            const response = await $fetch(url, requestOptions);
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
