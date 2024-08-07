import type { H3Event } from 'h3';
import { useSalesChannel } from '~~/utils/useSalesChannel';

export async function usePrepareRequest(event: H3Event) {
    const body = await readBody(event);
    const headers = getRequestHeaders(event);

    const requestHeaders = {};

    const { targetUrl } = await useSalesChannel(event);

    if (
        Object.keys(headers).includes('sw-language-id') &&
        headers['sw-language-id']
    ) {
        requestHeaders['sw-language-id'] = headers['sw-language-id'];
    }

    if (
        Object.keys(headers).includes('sw-access-key') &&
        headers['sw-access-key']
    ) {
        requestHeaders['sw-access-key'] = headers['sw-access-key'];
    }

    return {
        url: `${targetUrl}${event.path}`,
        requestOptions: {
            method: event.method,
            body: JSON.stringify(body),
            headers: requestHeaders,
        },
    };
}
