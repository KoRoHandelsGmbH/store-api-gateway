import { sleep } from 'k6';
import { getOptions, getRecords, performTest } from './functions.js';

export const options = getOptions;

const baseUrl =
    'https://store-api-proxy-git-feature-ntrkv-redis-storage-korohandelsgmbh.vercel.app';
const headers = {
    Cookie: '_vercel_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Vzh6c1NKRTdLbHcxSEpjanJDSkh0UVQiLCJpYXQiOjE3Mzk4NjkwNTAsIm93bmVySWQiOiJ0ZWFtX2ZRQVF4MFA3WU1GRlVucVBPVUhVMXVDMSIsImF1ZCI6InN0b3JlLWFwaS1wcm94eS1naXQtZmVhdHVyZS1udHJrdi1yZWRpcy1zdG9yYWdlLWtvcm9oYW5kZWxzZ21iaC52ZXJjZWwuYXBwIiwidXNlcm5hbWUiOiJ0aGFsbGEta29yb2Ryb2dlcmllIiwic3ViIjoic3NvLXByb3RlY3Rpb24ifQ.wtegc8kxS95p5H62AhYOBPs_m1tKBpKxQdOenaIXeN0',
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
