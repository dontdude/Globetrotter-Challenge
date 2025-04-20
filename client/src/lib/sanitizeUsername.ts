export function sanitizeUsername(username: string): string {
    return username
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '') // Only allow alphanumerics, hyphen, underscore
        .slice(0, 20); // Limit to 20 chars
}
