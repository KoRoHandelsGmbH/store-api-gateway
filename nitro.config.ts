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
            url: 'redis://default:rE5Jz2x6FCAR4NpWQBYz@62.113.228.107:6381/db0',
        },
    },
});
