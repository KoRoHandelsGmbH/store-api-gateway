import { usePrepareRequest } from '~~/utils/usePrepareRequest';
import type { Schemas } from '#shopware';

export default defineCachedEventHandler(
    async (event) => {
        const { url, requestOptions } = await usePrepareRequest(event);

        try {
            const response: Schemas['Category'][] = await $fetch(
                url,
                requestOptions,
            );
            return response.map((item) => {
                item.customFields = {};
                item.media = undefined;
                item.description = '';

                if (item.translated) {
                    item.translated.description = '';
                }

                item.children = item.children.map((child) => {
                    child.customFields = {};
                    child.description = '';
                    child.media = undefined;

                    if (child.translated) {
                        child.translated.description = '';
                    }

                    return child;
                });

                return item;
            });
        } catch (err) {
            throw createError(err);
        }
    },
    {
        maxAge: 60 * 1 * 60,
        swr: true,
        varies: ['sw-access-key', 'sw-language-id', 'x-env'],
    },
);
