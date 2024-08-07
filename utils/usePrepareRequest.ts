import type { H3Event } from 'h3';
import { useSalesChannel } from '~~/utils/useSalesChannel';
import { useSanitizedPath } from '~~/utils/useSanitizedPath';

export async function usePrepareRequest(event: H3Event) {
    const body = await readBody(event);
    const headers = getRequestHeaders(event);

    const requestHeaders = {};

    const { targetUrl, accessToken } = await useSalesChannel(event);
    const sanitizedPath = useSanitizedPath(event.path);

    if (
        Object.keys(headers).includes('sw-language-id') &&
        headers['sw-language-id']
    ) {
        requestHeaders['sw-language-id'] = headers['sw-language-id'];
    }
    requestHeaders['sw-access-key'] = accessToken;

    return {
        url: `${targetUrl}${sanitizedPath}`,
        requestOptions: {
            method: event.method,
            body: JSON.stringify(body),
            headers: requestHeaders,
        },
    };
}
