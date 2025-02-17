import http from 'k6/http';
import { check, sleep } from 'k6';
import csv from 'k6/experimental/csv';
import { open } from 'k6/experimental/fs';

export const options = {
    // Load test for 2 mins with 50 VUs
    stages: [
        { duration: '1s', target: 1 },
        // { duration: '5m', target: 100 },
        // { duration: '1m', target: 0 },
    ],
};

const baseUrl = 'https://api-proxy.koro.com';
const headers = {
    'Content-Type': 'application/json',
    'sw-access-key': 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
    'x-vercel-protection-bypass': 'EFc2HoLO2HUIQ4Z3S8PlgfnS8BKHP45Y',
};

const performTest = (method, slug) => {
    let res;

    switch (method) {
        case 'GET':
            res = http.get(`${baseUrl}${slug}`, {
                headers,
            });
            break;
        case 'POST':
            res = http.post(`${baseUrl}${slug}`, undefined, {
                headers,
            });
            break;
        default:
            return;
    }

    console.log(method, slug);
    console.log(res.status);
    console.log(res.request.headers);
    console.log(res.headers);

    check(res, {
        [slug]: (r) => r.status === 200,
    });
};

const records = await csv.parse(await open('./extract.csv'), {
    asObjects: true,
});

const filteredRecords = records.map((record) => {
    if (record.group.includes('/store-api/checkout')) {
        return undefined;
    }

    if (record.group.includes('@proxy.method:GET')) {
        return {
            method: 'GET',
            slug: record.group
                .split(';')
                .find((r) => r.startsWith('@proxy.path'))
                .split(':')[1],
        };
    }

    if (
        record.group.includes('@proxy.method:POST') &&
        (record.group.includes('/store-api/language') ||
            record.group.includes('/store-api/product') ||
            record.group.includes('/store-api/category') ||
            record.group.includes('/store-api/navigation') ||
            record.group.includes('/store-api/salutation') ||
            record.group.includes('/store-api/country') ||
            record.group.includes('/store-api/seo-url'))
    ) {
        return {
            method: 'POST',
            slug: record.group
                .split(';')
                .find((r) => r.startsWith('@proxy.path'))
                .split(':')[1],
        };
    }
});

export default async () => {
    filteredRecords.forEach((record) => {
        if (!record) {
            return;
        }

        performTest(record.method, record.slug);
    });

    // http.post(`${baseUrl}/language`, {
    //     headers,
    // });
    //
    // http.get(`${baseUrl}/checkout/survey/options`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/country`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/payment-method?onlyAvailable=1`, {
    //     headers,
    // });
    //
    // http.post(
    //     `${baseUrl}//navigation/0191559989177d0b9f1a6f8c0a53cdeb/0191559989177d0b9f1a6f8c0a53cdeb`,
    //     {
    //         headers,
    //     },
    // );
    //
    // http.post(`${baseUrl}/shipping-method?onlyAvailable=true`, {
    //     headers,
    // });
    //
    // http.get(`${baseUrl}/checkout/cart`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/0191559989177d0b9f1a6f8c0a53cdeb`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/salutation`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/country-state/b379dec7c6834ce091d341d3e9cb581d`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/navigation/footer-navigation/footer-navigation`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/019155ba27b97b31944bdd87de4d3506`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/01919946a3797eaa939a82ff1775efdf`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/019155bcc1ab73709f14c68ca07b9c5c`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/01943b4162e97b8296be5b9b154d6d50`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/0191559ae4747220a50815213d6f5c4b`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/0191559b045a7b97b367cbcbc8508b10`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/0191559a78897069a171a88038b02f28`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/category/39e5a0d1022e5188b7c7607678e26151`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/e17bbe2b67c45972aac6a0dae822a043`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/6d523eda5fb95ab4b691c9916a391223`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/01928b2e79287155a8fa068f336c8813`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/5b23cedb8c6e558c82c8573b54634bac`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/1aa704c884f75f2ea79890e33ae5bbf2`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/0b61497dfe1258ae92323870d709acfa`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/b420592d82fe5793b1045134e7509686`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/b150799e54145f519c1dc4395b7bda0e`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/01929a39769673cdbbc975947aa08da4`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/01b05896b15d5d9db59ceaf0b4f0176d`, {
    //     headers,
    // });
    //
    // http.post(`${baseUrl}/product/738eadd4827853a6b2a57e1c3d853f64`, {
    //     headers,
    // });

    sleep(1);
};
