/** @type {import('next').NextConfig} */

module.exports = {
  distDir: 'build',
  reactStrictMode: true,
  // swcMinify: true,
    compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,

  },
}
