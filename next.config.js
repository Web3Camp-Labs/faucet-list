/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  distDir: 'build',
  reactStrictMode: true,
  // swcMinify: true,
    compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,

  },
  assetPrefix: isProd ?'/faucet-list':'',
}
