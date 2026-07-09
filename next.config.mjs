
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
            { protocol: 'https', hostname: 'img.clerk.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'loremflickr.com' },
            { protocol: 'https', hostname: 'live.staticflickr.com' },
        ]
    }
};

export default nextConfig;
