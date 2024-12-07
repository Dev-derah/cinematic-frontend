/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", 
        port: "",
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },      
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
       {
        protocol: 'https',
        hostname: 'cinematic-frontend.vercel.app',
        pathname: '/**',
      },
    ],
    
    ],
  },
};

export default nextConfig;
