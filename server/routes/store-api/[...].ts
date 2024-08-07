import { useSalesChannel } from '~~/utils/useSalesChannel';
import { proxyRequest } from '#imports';

export default defineEventHandler(async (event) => {
    const { targetUrl } = await useSalesChannel(event);

    return await proxyRequest(event, `${targetUrl}${event.path}`);
});
