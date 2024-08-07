import { useSalesChannel } from '~~/utils/useSalesChannel';
import { proxyRequest } from '#imports';

export default defineEventHandler(async (event) => {
    const { targetUrl } = await useSalesChannel(event);

    const sanitizedPath = event.path.slice(3);
    return await proxyRequest(event, `${targetUrl}${sanitizedPath}`);
});
