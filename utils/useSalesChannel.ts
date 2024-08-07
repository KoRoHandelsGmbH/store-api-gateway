import type { H3Event } from 'h3';

type SalesChannel = {
    baseURL: string;
    shopwareAccessToken: string;
    urlLocales: string[];
};

export async function useSalesChannel(event: H3Event) {
    const config = useRuntimeConfig(event);

    const locale = getRouterParam(event, 'locale');
    const channels = config.channels as SalesChannel[];
    const findChannel = (urlLocale: string): SalesChannel => {
        return channels.find(({ urlLocales }) => {
            return urlLocales.includes(urlLocale);
        });
    };
    const channel = findChannel(locale);

    if (!channel) {
        // TODO: error reporting
    }

    const targetUrl = channel.baseURL;
    const accessToken = channel.shopwareAccessToken;

    return {
        channel,
        targetUrl,
        accessToken,
    };
}
