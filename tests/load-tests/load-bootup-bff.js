import { sleep } from 'k6';
import { getOptions, getRecords, performTest } from './functions.js';

export const options = getOptions;

const baseUrl = 'https://bff.koro.software';

const records = await getRecords();

export default () => {
    records.forEach((record) => {
        if (!record) {
            return;
        }

        performTest(record.method, record.slug, baseUrl);
    });

    sleep(1);
};
