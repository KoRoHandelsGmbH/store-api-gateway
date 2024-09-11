//https://nitro.unjs.io/config
export default defineNitroConfig({
    srcDir: 'server',
    runtimeConfig: {
        baseProxyUrl: 'https://www.korodrogerie.de',
        devProxyUrl: 'http://integrations.koro.software',
    },
});
