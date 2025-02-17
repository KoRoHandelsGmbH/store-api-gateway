//https://nitro.unjs.io/config
export default defineNitroConfig({
    srcDir: 'server',
    runtimeConfig: {
        baseProxyUrl: 'https://www.korodrogerie.de',
        devProxyUrl: 'https://integrations.koro.software',
    },
    storage: {
        cache: {
            driver: 'redis',
            host: '62.113.228.107',
            port: '6381',
            password: 'rE5Jz2x6FCAR4NpWQBYz',
        },
    },
});
