import http from 'k6/http';

export const options = {
    stages: [
        { duration: '30s', target: 250 }, // fast ramp-up to a high point
        { duration: '30s', target: 0 }, // quick ramp-down to 0 users
    ],
};

export default () => {
    const payload = JSON.stringify({
        filter: [
            {
                type: 'equals',
                field: 'id',
                value: '16c65d351d8e489aacd2ab82c259b4fa',
            },
        ],
    });
    const headers = {
        'Content-Type': 'application/json',
        'sw-access-key': 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
    };
    http.post('https://api-proxy.koro.com/store-api/category', payload, {
        headers,
    });
};
