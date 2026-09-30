"use client";

import { useState } from "react";

// <img> comum: as imagens vêm de domínios variados das lojas (sem configurar next/image).
export function ProductImage({
  src,
  alt,
  fallback = "/placeholders/generic.svg",
  className,
}: {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed || !src ? fallback : src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
