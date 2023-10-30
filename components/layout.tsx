import Head from 'next/head';
import Header from './header';
import {ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode;
    pageName?: String;
}

export default function Layout({children, pageName = 'Lorcana DB'}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="description" content="Lorcana DB viewer" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="pt-[10vh] min-h-[100vh]">{children}</div>
        </>
    );
}
