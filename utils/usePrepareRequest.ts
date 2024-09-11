import type { H3Event, RouterMethod } from 'h3';
import { useSalesChannel } from '~~/utils/useSalesChannel';

export async function usePrepareRequest(event: H3Event) {
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

    if (
        Object.keys(headers).includes('sw-context-token') &&
        headers['sw-context-token']
    ) {
        requestHeaders['sw-context-token'] = headers['sw-context-token'];
    }

    if (
        Object.keys(headers).includes('sw-include-seo-urls') &&
        headers['sw-include-seo-urls']
    ) {
        requestHeaders['sw-include-seo-urls'] = headers['sw-include-seo-urls'];
    }

    const requestOptions = {
        cache: 'force-cache' as RequestCache,
        method: event.method,
        headers: requestHeaders,
    } as unknown as {
        cache: RequestCache;
        body: string;
        method: RouterMethod;
        headers: {
            [key: string]: string;
        };
    };

    if (event.method.toLowerCase() === 'post') {
        requestOptions.body = JSON.stringify(await readBody(event));
    }

    return {
        url: `${targetUrl}${event.path}`,
        requestOptions,
    };
}
