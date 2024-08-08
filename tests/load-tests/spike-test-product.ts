import http from 'k6/http';

export const options = {
    // Key configurations for spike in this section
    stages: [
        { duration: '30s', target: 500 }, // fast ramp-up to a high point
        { duration: '30s', target: 0 }, // quick ramp-down to 0 users
    ],
};

export default () => {
    const payload = JSON.stringify({
        filter: [
            {
                type: 'equals',
                field: 'id',
                value: 'bd4a8d0cbda15eb18735548b920465b2',
            },
        ],
    });
    const headers = {
        'Content-Type': 'application/json',
        'sw-access-key': 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
    };
    http.post('https://api-proxy.koro.com/store-api/product', payload, {
        headers,
    });
};
