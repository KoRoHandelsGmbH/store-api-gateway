import { usePrepareRequest } from '~~/utils/usePrepareRequest';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { onlyAvailable } = query;
    const { url, requestOptions } = await usePrepareRequest(event);

    try {
        const response = await $fetch(url, requestOptions);
        setResponseHeaders(event, {
            'Cache-Control': onlyAvailable
                ? 's-max-age=0, private'
                : 's-maxage=3600, stale-while-revalidate',
        });
        return response;
    } catch (err) {
        throw createError(err);
    }
});
