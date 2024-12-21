/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-preview.redd.it",
        pathname: "**",
      },
    ],
    domains: ["media.giphy.com"],
  },
};

export default nextConfig;
