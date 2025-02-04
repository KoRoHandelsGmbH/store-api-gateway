import { usePrepareRequest } from '~~/utils/usePrepareRequest';
import { proxyRequest } from '#imports';

export default defineEventHandler(async (event) => {
    const { url, requestOptions } = await usePrepareRequest(event);

    return await proxyRequest(event, url, {
        headers: requestOptions.headers,
    });
});
