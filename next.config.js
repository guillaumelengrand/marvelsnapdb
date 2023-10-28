/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'marvelsnapzone.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.marvelsnap.pro',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.snap.fan',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.wavendb.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.dreamborn.ink',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
