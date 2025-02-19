import http from 'k6/http';
import { check } from 'k6';
import { open } from 'k6/experimental/fs';
import csv from 'k6/experimental/csv';

const _baseUrl = 'https://api-proxy.koro.com';
const _headers = {
    'Content-Type': 'application/json',
    'sw-access-key': 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
    'x-vercel-protection-bypass': 'EFc2HoLO2HUIQ4Z3S8PlgfnS8BKHP45Y',
};

export const getOptions = {
    // Load test for 2 mins with 50 VUs
    stages: [
        { duration: '30m', target: 100 },
        // { duration: '5m', target: 100 },
        // { duration: '1m', target: 0 },
    ],
};

export const getRecords = async () => {
    const records = await csv.parse(await open('./extract.csv'), {
        asObjects: true,
    });

    return records.map((record) => {
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
                record.group.includes('/store-api/seo-url') ||
                record.group.includes('/store-api/shipping-method'))
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
};

export const performTest = (
    method,
    slug,
    baseUrl = undefined,
    headers = {},
) => {
    baseUrl = baseUrl ?? _baseUrl;
    headers = {
        ..._headers,
        ...headers,
    };

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

    // console.log(method, `${baseUrl}${slug}`);
    // console.log(res.status);
    // console.log(res.request.headers);
    // console.log(res.headers);

    check(res, {
        [slug]: (r) => r.status === 200,
    });
};
