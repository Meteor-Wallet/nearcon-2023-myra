'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        fetch('/api/session');
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
