import http from 'k6/http';

export const options = {
    stages: [
        { duration: '30s', target: 250 }, // fast ramp-up to a high point
        { duration: '30s', target: 0 }, // quick ramp-down to 0 users
    ],
};

export default () => {
    const headers = {
        'Content-Type': 'application/json',
        'sw-access-key': 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
    };
    http.post(
        'https://api-proxy.koro.com/store-api/navigation/main-navigation/main-navigation',
        '',
        {
            headers,
        },
    );
};
