import type { MetadataRoute } from "next";
import { PROPERTIES } from "./data";
import { SITE_URL } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/propiedades", "/equipo", "/contacto"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
    }),
  );

  const propertyRoutes = PROPERTIES.map((p) => ({
    url: `${SITE_URL}/propiedades/${p.id}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
