//https://nitro.unjs.io/config
export default defineNitroConfig({
    srcDir: 'server',
    runtimeConfig: {
        channels: [
            {
                baseURL: 'https://www.korodrogerie.de',
                shopwareAccessToken: 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
                urlLocales: ['de', 'deen'],
            },
            {
                baseURL: 'https://www.koro.fr',
                shopwareAccessToken: 'SWSCTVR2QLJRUZDQV0LWQ0VLNQ',
                urlLocales: ['fr'],
            },
            {
                baseURL: 'https://www.koro-shop.it',
                shopwareAccessToken: 'SWSCBFDGSKCXVLK3UDHRRW9QYG',
                urlLocales: ['it'],
            },
            {
                baseURL: 'https://www.koro-shop.be',
                shopwareAccessToken: 'SWSCRMVGQZR5CHF6UKLWYUXJTG',
                urlLocales: ['bede', 'benl', 'befr'],
            },
            {
                baseURL: 'https://www.koro-shop.at',
                shopwareAccessToken: 'SWSCTLBKZXIXOFZSOTBWVFPANW',
                urlLocales: ['at'],
            },
            {
                baseURL: 'https://www.koro-shop.fi',
                shopwareAccessToken: 'SWSCEENBNMDEOUD5ZZBYQNJWNA',
                urlLocales: ['fi', 'fisv'],
            },
            {
                baseURL: 'https://www.koro-shop.dk',
                shopwareAccessToken: 'SWSCQK9ONZCXYNIZT1JVRVJSSG',
                urlLocales: ['dk'],
            },
            {
                baseURL: 'https://www.koro-shop.pt',
                shopwareAccessToken: 'SWSCEEZONWLSY0HADK9TZVHDYW',
                urlLocales: ['pt'],
            },
            {
                baseURL: 'https://www.koro.com/es',
                shopwareAccessToken: 'SWSCRZN6OEPSTLUZAWXACDL4SW',
                urlLocales: ['es'],
            },
        ],
    },
});
