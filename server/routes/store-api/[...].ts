import { defineCachedEventHandler } from '#imports';

export default defineCachedEventHandler(
    async (event) => {
        const target = `https://www.korodrogerie.de${event.path}`;

        const body = await readBody(event);
        const headers = getRequestHeaders(event);

        const requestHeaders = {};

        if (
            Object.keys(headers).includes('sw-access-key') &&
            headers['sw-access-key']
        ) {
            requestHeaders['sw-access-key'] = headers['sw-access-key'];
        }

        if (
            Object.keys(headers).includes('sw-language-id') &&
            headers['sw-language-id']
        ) {
            requestHeaders['sw-language-id'] = headers['sw-language-id'];
        }

        if (
            Object.keys(headers).includes('sw-context-token') &&
            headers['sw-context-token']
        ) {
            requestHeaders['sw-context-token'] = headers['sw-context-token'];
        }

        try {
            const response = await $fetch(target, {
                method: event.method,
                body: JSON.stringify(body),
                headers: requestHeaders,
            });

            return response;
        } catch (err) {
            console.log(err);
        }
    },
    {
        maxAge: 60 * 1 * 60,
        swr: true,
        varies: ['sw-access-key', 'sw-language-id', 'sw-context-token'],
    },
);
