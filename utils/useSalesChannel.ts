import type { H3Event } from 'h3';

type SalesChannelConfig = {
    baseURL: string;
    shopwareAccessToken: string;
    urlLocales: string[];
};

export async function useSalesChannel(event: H3Event) {
    const config = useRuntimeConfig(event);
    const requestAccessKey = getRequestHeader(event, 'sw-access-key');

    const locale = getRouterParam(event, 'locale');
    const channels = config.channels as SalesChannelConfig[];
    const isRequestAccessKeyValid = channels.find(({ shopwareAccessToken }) => {
        return requestAccessKey === shopwareAccessToken;
    });

    if (!isRequestAccessKeyValid) {
        throw createError({
            statusCode: 412,
            statusMessage: 'Precondition Failed',
        });
    }

    const channel = channels.find(({ urlLocales }) => {
        return urlLocales.includes(locale);
    });

    if (!channel) {
        throw createError({
            status: 404,
            statusMessage: 'SalesChannel Not Found',
        });
    }

    const targetUrl = channel.baseURL;
    const accessToken = channel.shopwareAccessToken;

    return {
        channel,
        targetUrl,
        accessToken,
    };
}
