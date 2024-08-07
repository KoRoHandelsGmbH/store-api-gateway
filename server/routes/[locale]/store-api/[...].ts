import { useSalesChannel } from '~~/utils/useSalesChannel';
import { useSanitizedPath } from '~~/utils/useSanitizedPath';
import { proxyRequest } from '#imports';

export default defineEventHandler(async (event) => {
    const { targetUrl, accessToken } = await useSalesChannel(event);

    const sanitizedPath = useSanitizedPath(event.path);
    return await proxyRequest(event, `${targetUrl}${sanitizedPath}`, {
        headers: {
            // Request always with the correct header for the saleschannel
            'sw-access-key': accessToken as string,
        },
    });
});
