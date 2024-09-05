import { usePrepareRequest } from '~~/utils/usePrepareRequest';
import { useStoreApiError } from '~~/utils/useStoreApiError';
import type { Schemas } from '#shopware';

export default defineCachedEventHandler(
    async (event) => {
        const { url, requestOptions } = await usePrepareRequest(event);

        try {
            const response: Schemas['Category'][] = await $fetch(
                url,
                requestOptions,
            );
            return response;
        } catch (err) {
            throw useStoreApiError(err);
        }
    },
    {
        maxAge: 60 * 1 * 60,
        swr: true,
        varies: ['sw-access-key', 'sw-language-id', 'x-env'],
    },
);
