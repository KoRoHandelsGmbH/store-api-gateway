import { usePrepareRequest } from '~~/utils/usePrepareRequest';
import { useStoreApiError } from '~~/utils/useStoreApiError';
import { useGiftVoucherFilter } from '~~/utils/useGiftVoucherFilter';

export default defineEventHandler(async (event) => {
    const { url, requestOptions } = await usePrepareRequest(event);

    try {
        const response = await $fetch(url, requestOptions);

        useGiftVoucherFilter(response);

        return response;
    } catch (err) {
        throw useStoreApiError(err);
    }
});
