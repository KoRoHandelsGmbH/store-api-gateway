# store-api-proxy

![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
![Prettier Badge](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge)
![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=for-the-badge)

`store-api-proxy` powered by [`Nitropack`](https://nitro.unjs.io/) should be understood as a thin-layer on top of the [Shopware' Store-API](https://shopware.stoplight.io/docs/store-api/38777d33d92dc-quick-start-guide). It provides us with a easy-to-maintain way to leverage Vercel' data cache for caching (and later on transform as well as orchestrate) API responses to overcome the shortcomings of the Store API we're consuming.

## Features
* Resolving sales channel based on request header `sw-access-key`
* Automatically switching to development enviroment using `x-env` header
* [Nitro' filesystem routing](https://nitro.unjs.io/guide/routing#filesystem-routing) for API routes
* Conventional Commits support using [`husky`](https://typicode.github.io/husky/) as pre-commit hook
* Type-safe using Schema definitions from [Shopware Frontends API client](https://www.npmjs.com/package/@shopware/api-client)
* Code quality checks using [`ESLint`](https://eslint.org/) & [`Prettier`](https://prettier.io/)
* Deployment on Vercel, boosted using [`Turborepo`](https://turbo.build/repo/docs/guides/single-package-workspaces)

## Installation

```bash
git checkout https://github.com/KoRoHandelsGmbH/store-api-proxy
cd store-api-proxy
npm install
```

## How it works

The store-api-proxy is providing a thin-layer on top of the Store-API which is getting shipped with each and every sales channels created within our Shopware instance. Depending on the sales channel a different `sw-access-key` request header has to be provided within the incoming request.

Based on the `sw-access-key` the proxy is getting the right target url. If an additional `sw-language-id` is getting passed within the request headers it'll respect the header and forwards the request to the Store-API.

Routes we would like to be cached are provided as their own API route using a [`defineCachedEventHandler()`](https://nitro.unjs.io/guide/cache#cached-event-handlers). These event handler allowing a second argument for cache control. Usually we want to cache the response in Vercel' data cache for 60 minutes and provide a stale response while invalidating:

```js
{
    maxAge: 60 * 1 * 60,
    swr: true,
    varies: ['sw-access-key', 'sw-language-id'],
}
```

## Switching between `production` & `development` environment

When the incoming request to the store-api-proxy contains the header `x-env` and the content of the header is either `dev` or `development` we're switching the target url from the production servers to the integrations server.

## Providing new routes

### File based routes

We're using [Nitro' filesystem routing](https://nitro.unjs.io/guide/routing#filesystem-routing) for providing additional event handlers for API routes. Each and every route has to be placed into the folder `server/routes/store-api`. The right target url will be terminated based on the `sw-access-key` header of the incoming request.

When your route doesn't contain additional route parameters (e.g. for example `POST /language`, `GET /payment-method`) we simply provide the last part of the URL as the file name.

```
Original url: /store-api/language
File path: server/routes/store-api/language.ts
```

When we're dealing with routes which are containing additional route parameters (e.g. for example `POST /navigation/{navigationId}/{navigationId}`) we're using a catch-all routes:

```
Original url: /store-api/navigation
File path: server/routes/store-api/navigation/[...].ts
```

### Providing a new event handler

After creating the necessary file using the filesystem routing we're providing a [`defineCachedEventHandler()`](https://nitro.unjs.io/guide/cache#cached-event-handlers) including the basic cache configuration:

```ts
export default defineCachedEventHandler(
    async (event) => {},
    {
        maxAge: 60 * 1 * 60,
        swr: true,
        varies: ['sw-access-key', 'sw-language-id'],
    },
);
```

Next up, it's time to fill out the event handler body. For a convenient and easy-to-use way to get the necessary information from the incoming request you can use the helper method `usePrepareRequest(event: H3Event)`. It's important here to provide the `H3Event` as parameter. The event contains the context, response and request.

Last but not least, we have to fire the request and providing the error reporting using [`createError`](https://h3.unjs.io/guide/event-handler#error-handling).

```ts
const { url, requestOptions } = await usePrepareRequest(event);

try {
    const response = await $fetch(url, requestOptions);
    return response;
} catch (err) {
    throw createError(err);
}
```

In the end your event listener should look like this:

```ts
import { usePrepareRequest } from '~~/utils/usePrepareRequest';

export default defineCachedEventHandler(
    async (event) => {
        const { url, requestOptions } = await usePrepareRequest(event);

        try {
            const response = await $fetch(url, requestOptions);
            return response;
        } catch (err) {
            throw createError(err);
        }
    },
    {
        maxAge: 60 * 1 * 60,
        swr: true,
        varies: ['sw-access-key', 'sw-language-id'],
    },
);
```

### Transforming the response

Additionally it's possible to transform the response before sending it to the client. Let's assume we're within the route `/{locale}/store-api/navigation/{navigationId}/{navigationId}`.

Within your event handler body you should find a code snippet like this:

```ts
const response = await $fetch(url, requestOptions);
return response;
```

Before we're able to transform the response we have to define the type of the response. For that the store-api-proxy provides the entitiy schemas from [Shopware Frontends API client](https://www.npmjs.com/package/@shopware/api-client).

First you're importing the `Schemas` type from the globally available module `#shopware`;

```ts
import type { Schemas } from '#shopware';
```

Next up, you map the response to the correct entity schema. In this example we're getting back an array `category`

```ts
const response: Schemas['Category'][] = await $fetch(url, requestOptions);
return response;
```

Now, you can iterate over response using [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and override the properties you don't need:

```ts
const response: Schemas['Category'][] = await $fetch(
    url,
    requestOptions,
);

return response.map((item) => {
    item.description = '';

    if (item.translated) {
        item.translated.description = '';
    }

    return item;
});
```

## Helper methods

### `useSalesChannel(event: H3Event)`

The method `useSalesChannel()` is a fundamental part of the stack resolving. It's reading out the runtime config which contains the information about the available sales channels, gets the `sw-access-key` from the request stack and returns the right target url based on the `sw-access-key`.

### `usePrepareRequest(event: H3Event)`

The method `usePrepareRequest()` prepares the request to be send by the proxy. It reads the body and headers of the incoming request, sanitizes the path using `useSanitizedPath()`, provides the correct `sw-access-key` using `useSalesChannel()` as well as the necessary headers and body for the request to be sent to the Store API.

### Development

You can start the development sever after a successful `npm install` using:

```bash
npm run dev
```

This spawns up the Nitro on the port `3000`. A different port can be provided using a `.env` file with the following content:

```
PORT=9210
```

After doing the changes you wanted to do, please commit your changes using a commit message following the [conventional commit guidelines](https://www.conventionalcommits.org/en/v1.0.0/#summary).

## License

[MIT](https://choosealicense.com/licenses/mit/)