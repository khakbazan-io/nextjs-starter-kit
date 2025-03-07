import { site } from "@/core/config/site";
import type { Metadata } from "next";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

/**
 * Arguments for generating metadata for SEO and OpenGraph.
 */
type GenerateMetaArgs = {
  title: string; // Page title
  description: string; // Meta description for SEO
  slug?: string; // URL slug (appended to the site URL)
  keywords?: string[]; // Keywords for SEO
  indexable?: boolean; // Whether the page should be indexed (default: true)
  tags?: string[]; // Tags for OpenGraph metadata
  category?: string; // Page category
  type?: OpenGraphType; // OpenGraph type (e.g., "website", "article")
  publishedTime?: string; // Published timestamp (ISO 8601 format)
  modifiedTime?: string; // Modified timestamp (ISO 8601 format)
  image?: string; // OpenGraph image URL
  other?: Record<string, string | number>; // Additional metadata
};

/**
 * Generates structured metadata for SEO and OpenGraph sharing.
 *
 * @param {GenerateMetaArgs} params - Configuration options for the metadata.
 * @returns {Metadata} An object containing metadata properties.
 */
export function generateMeta({
  title,
  description,
  slug,
  keywords,
  indexable = true,
  category,
  image,
  modifiedTime,
  publishedTime,
  tags,
  type,
  other = {},
}: GenerateMetaArgs): Metadata {
  // Construct the base metadata object
  const schema: Metadata = {
    title: title,
    description: description,
    keywords: keywords,
    category: category,
    applicationName: site.name.en,
    robots: {
      follow: indexable,
      index: indexable,
    },
    openGraph: {
      title: title,
      description: description,
      url: slug ? `${site.url}/${slug}` : site.url,
      siteName: site.name.fa,
      locale: "fa_IR",
      tags: tags,
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
      images: image ? { url: image } : undefined, // Ensuring proper OpenGraph image format
    },
    alternates: {
      canonical: slug ? `${site.url}/${slug}` : site.url,
    },
    other: {
      "og:brand": site.name.fa!,
      ...other,
    },
  };

  // Conditionally add OpenGraph type if provided
  return type
    ? { ...schema, openGraph: { ...schema.openGraph, type: type } }
    : schema;
}
