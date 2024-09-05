import { usePrepareRequest } from '~~/utils/usePrepareRequest';
import { useStoreApiError } from '~~/utils/useStoreApiError';

export default defineEventHandler(async (event) => {
    const { url, requestOptions } = await usePrepareRequest(event);

    try {
        const response = await $fetch(url, requestOptions);
        return response;
    } catch (err) {
        throw useStoreApiError(err);
    }
});
