import type { H3Event, RouterMethod } from 'h3';
import { useSalesChannel } from '~~/utils/useSalesChannel';

export async function usePrepareRequest(event: H3Event) {
    const headers = getRequestHeaders(event);
    const requestHeaders = {};
    const { targetUrl } = await useSalesChannel(event);
    const passHeaders = [
        'sw-language-id',
        'sw-access-key',
        'sw-context-token',
        'sw-include-seo-urls',
    ];

    passHeaders.forEach((passHeader) => {
        if (Object.keys(headers).includes(passHeader) && headers[passHeader]) {
            requestHeaders[passHeader] = headers[passHeader];
        }
    });

    const requestOptions = {
        cache: 'force-cache' as RequestCache,
        method: event.method,
        headers: requestHeaders,
    } as unknown as {
        cache: RequestCache;
        body: string | FormData;
        method: RouterMethod;
        headers: {
            [key: string]: string;
        };
    };

    if (event.method.toLowerCase() === 'post') {
        const contentType = getRequestHeader(event, 'content-type');

        requestOptions.body = JSON.stringify(await readBody(event));

        if (contentType && contentType.startsWith('multipart/form-data')) {
            const formData = await readMultipartFormData(event);

            console.log(formData);

            const requestFormData = new FormData();
            formData.forEach(({ name, data, filename, type }) => {
                if (type && filename) {
                    requestFormData.append(name, new Blob([data]), filename);
                } else {
                    requestFormData.append(name, data);
                }
            });

            requestOptions.body = requestFormData;
        }
    }

    return {
        url: `${targetUrl}${event.path}`,
        requestOptions,
    };
}
