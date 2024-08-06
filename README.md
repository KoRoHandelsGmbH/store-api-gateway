# store-api-proxy

![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
![Prettier Badge](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge)
![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=for-the-badge)


`store-api-proxy` should be understood as a thin-layer on top of the [Shopware' Store-API](https://shopware.stoplight.io/docs/store-api/38777d33d92dc-quick-start-guide). It provides us with a easy-to-maintain way to leverage Vercel' data cache for caching (and later on transform as well as orchestrate) API responses to overcome the shortcomings of the Store API we're consuming.

## Installation

```bash
git checkout https://github.com/KoRoHandelsGmbH/store-api-proxy
cd store-api-proxy
npm install
```

## License

[MIT](https://choosealicense.com/licenses/mit/)