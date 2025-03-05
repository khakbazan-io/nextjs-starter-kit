import { site } from "@/core/config/site";
import type { Metadata } from "next";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

type GenerateMetaArgs = {
  title: string;
  description: string;
  slug?: string;
  keywords?: string[];
  indexable?: boolean;
  tags?: string[];
  category?: string;
  type?: OpenGraphType;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  other?: Record<string, string | number>;
};

type MetadataReturnType = Metadata;

export function generateMeta({
  description,
  slug,
  title,
  keywords,
  indexable = true,
  category,
  image,
  modifiedTime,
  publishedTime,
  tags,
  type,
  other = {},
}: GenerateMetaArgs): MetadataReturnType {
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
      images: image,
    },
    alternates: {
      canonical: slug ? `${site.url}/${slug}` : site.url,
    },
    other: {
      "og:brand": site.name.fa,
      ...(other ?? {}),
    },
  };

  return type
    ? { ...schema, openGraph: { ...schema?.openGraph, type: type } }
    : schema;
}
