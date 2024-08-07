export function useSanitizedPath(path: string): string {
    return path.replace(/^(\/[a-z+]{2,4})/, '');
}
