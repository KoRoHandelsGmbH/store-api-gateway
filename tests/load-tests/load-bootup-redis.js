import { sleep } from 'k6';
import { getOptions, getRecords, performTest } from './functions';

export const options = getOptions;

const baseUrl =
    'https://store-api-proxy-git-feature-ntrkv-redis-storage-korohandelsgmbh.vercel.app/store-api';
const headers = {
    Cookie: '_vercel_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJuU0poeHRqQmZMNWoyeWxKTEMzMUgzR1EiLCJpYXQiOjE3Mzk3OTkxMzksIm93bmVySWQiOiJ0ZWFtX2ZRQVF4MFA3WU1GRlVucVBPVUhVMXVDMSIsImF1ZCI6InN0b3JlLWFwaS1wcm94eS1sb3c5Y3kyeHQta29yb2hhbmRlbHNnbWJoLnZlcmNlbC5hcHAiLCJ1c2VybmFtZSI6ImtsYXJzdGlsIiwic3ViIjoic3NvLXByb3RlY3Rpb24ifQ.ch_bj7D1d7tmdMMKxdo_SKK6UALGCO1GXYkMOm7-HGs',
};

const records = await getRecords();

export default () => {
    records.forEach((record) => {
        if (!record) {
            return;
        }

        performTest(record.method, record.slug, baseUrl, headers);
    });

    sleep(1);
};
