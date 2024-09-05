import { usePrepareRequest } from '~~/utils/usePrepareRequest';

export default defineEventHandler(async (event) => {
    const { url, requestOptions } = await usePrepareRequest(event);

    try {
        const response = await $fetch(url, requestOptions);
        return response;
    } catch (err) {
        throw createError(err);
    }
});
