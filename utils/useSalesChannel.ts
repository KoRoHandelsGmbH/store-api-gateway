import type { H3Event } from 'h3';

type SalesChannelConfig = {
    baseProxyUrl: string;
    devProxyUrl: string;
};

export async function useSalesChannel(event: H3Event) {
    const config = useRuntimeConfig(event) as unknown as SalesChannelConfig;
    const envHeader = getRequestHeader(event, 'x-env');
    const isDevMode = envHeader === 'dev' || envHeader === 'development';

    const getTargetUrl = (): string => {
        if (isDevMode) {
            return config.devProxyUrl;
        }
        return config.baseProxyUrl;
    };

    const targetUrl = getTargetUrl();

    setResponseHeader(event, 'x-target-url', targetUrl);
    setResponseHeader(
        event,
        'x-mode',
        isDevMode ? 'development' : 'production',
    );

    return {
        targetUrl,
    };
}
