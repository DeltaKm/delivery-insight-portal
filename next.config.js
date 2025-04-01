
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Aggiungiamo configurazioni per assicurarci che i componenti shadcn funzionino correttamente
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig
