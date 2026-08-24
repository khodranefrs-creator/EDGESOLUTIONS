import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.url;
  const routes = ["", "/about", "/products", "/capabilities", "/industries", "/contact", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
