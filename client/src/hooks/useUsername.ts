'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { sanitizeUsername } from '../lib/sanitizeUsername';

export function useUsername(key = 'username') {
    const searchParams = useSearchParams();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fromQuery = searchParams.get(key);
        if (fromQuery) {
            const clean = sanitizeUsername(fromQuery);
            localStorage.setItem(key, clean);
            setUsername(clean);
        } else {
            const localUser = localStorage.getItem(key);
            if (localUser) setUsername(localUser);
        }
    }, [searchParams, key]);

    return username;
}
