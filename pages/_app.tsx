import Layout from '@/components/layout';
import '@/styles/globals.css';
import {NextUIProvider} from '@nextui-org/react';
import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </NextUIProvider>
        </SessionProvider>
    );
}
