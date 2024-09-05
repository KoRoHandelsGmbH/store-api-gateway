import type { H3Error } from 'h3';

type StoreApiError = {
    status: string;
    code: string;
    title: string;
    detail: string;
    meta: {
        [key: string]: unknown;
    };
};
export function useStoreApiError(err: unknown): H3Error {
    // @ts-expect-error Getting the error is not standardarized
    const errors = err.data;
    if (!Array.isArray(errors.errors)) {
        return createError(err);
    }

    const error = errors.errors[0] as unknown as StoreApiError;
    return createError({
        statusCode: parseInt(error.status),
        statusMessage: error.title,
        message: error.code,
        data: {
            detail: error.detail,
            meta: error.meta,
        },
    });
}
