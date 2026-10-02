/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // /us/privacy e /us/terms são apelidos das páginas internas (mesma rota dos dois mercados).
  async rewrites() {
    return [
      { source: "/us/privacy", destination: "/us/privacidade" },
      { source: "/us/terms", destination: "/us/termos" },
    ];
  },
  // Evita conteúdo duplicado: só o caminho canônico de cada mercado fica acessível.
  async redirects() {
    return [
      { source: "/us/privacidade", destination: "/us/privacy", permanent: true },
      { source: "/us/termos", destination: "/us/terms", permanent: true },
      { source: "/br/privacy", destination: "/br/privacidade", permanent: true },
      { source: "/br/terms", destination: "/br/termos", permanent: true },
    ];
  },
};

export default nextConfig;
