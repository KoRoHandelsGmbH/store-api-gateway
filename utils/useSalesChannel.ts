import type { H3Event } from 'h3';

type SalesChannelConfig = {
    baseUrl: string;
    devBaseUrl: string;
    accessKey: string;
    urlLocales: string[];
};

export async function useSalesChannel(event: H3Event) {
    const config = useRuntimeConfig(event);
    const envHeader = getRequestHeader(event, 'x-env');
    const requestAccessKey = getRequestHeader(event, 'sw-access-key');
    const isDevMode = envHeader === 'dev' || envHeader === 'development';

    const channels = config.channels as SalesChannelConfig[];
    const channel = channels.find(({ accessKey }) => {
        return requestAccessKey === accessKey;
    });

    if (!channel) {
        throw createError({
            status: 404,
            statusMessage: 'Sales Channel Not Found',
        });
    }

    const getTargetUrl = (channel: SalesChannelConfig): string => {
        if (isDevMode) {
            return channel.devBaseUrl;
        }
        return channel.baseUrl;
    };

    const targetUrl = getTargetUrl(channel);

    setResponseHeader(event, 'x-target-url', targetUrl);
    setResponseHeader(event, 'x-mode', envHeader);

    return {
        channel,
        targetUrl,
    };
}
