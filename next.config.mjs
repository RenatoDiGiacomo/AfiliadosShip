/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // O site é só do Brasil e sem prefixo: /br/... e /us/... antigos continuam funcionando e levam ao endereço novo.
  async redirects() {
    return [
      { source: "/br", destination: "/", permanent: true },
      { source: "/br/:path*", destination: "/:path*", permanent: true },
      { source: "/us", destination: "/", permanent: true },
      { source: "/us/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
