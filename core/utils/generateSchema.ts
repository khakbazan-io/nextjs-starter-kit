import { site } from "../config";
import { toIsoDate } from "./toIsoDate";

type ArticleSchemaProps = {
  title: string;
  description: string;
  slug: string;
  createdAt: number;
  updatedAt: number;
  image: string;
};

type CourseSchemaProps = {
  title: string;
  description: string;
  slug: string;
  createdAt: number;
  image: string;
  offPrice: string;
  category: string;
  schema: {
    about: string;
    requirements: string;
    audience: string;
    neededTimeInWeek: string;
  };
};

type BreadcrumbSchemaProps = {
  title: string;
  slug: string;
  type: "course" | "blog";
};

export function generateCourseSchema({
  createdAt,
  description,
  image,
  slug,
  title,
  offPrice,
  category,
  schema,
}: CourseSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    publisher: {
      "@type": "Organization",
      name: site.name.fa,
      sameAs: site.url,
    },
    provider: {
      "@type": "Organization",
      name: site.name.fa,
      sameAs: site.url,
    },
    "@id": `${site.url}/courses/${slug}`,
    name: title,
    description: description,
    image: image,
    inLanguage: "fa",
    audience: {
      "@type": "Audience",
      audienceType: schema?.audience,
    },
    about: {
      "@type": "Thing",
      name: schema?.about,
    },
    brand: {
      "@type": "Brand",
      name: site.name.fa,
    },
    offers: {
      "@type": "Offer",
      price: Number(offPrice) * 10,
      priceCurrency: "IRR",
      category: category,
      url: `${site.url}/courses/${slug}`,
      availability: "http://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      startDate: toIsoDate(createdAt),
      courseMode: "online",
      courseWorkload: schema?.neededTimeInWeek,
      description: description,
      instructor: {
        "@type": "Person",
        name: site.author.name.fa,
        sameAs: site.author.socials.linkedin,
      },
    },
    coursePrerequisites: schema?.requirements,
  };
}

export function generateArticleSchema({
  createdAt,
  description,
  slug,
  title,
  updatedAt,
  image,
}: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${slug}`,
    },
    author: {
      "@type": "Person",
      url: site.author.socials.linkedin,
      name: site.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name.fa,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: "https://storage.vaspar.io/general/vaspar-logo.png",
        width: 600,
        height: 140,
      },
    },
    datePublished: toIsoDate(createdAt),
    dateModified: toIsoDate(updatedAt),
  };
}

export function generateBreadcrumbSchema({
  type,
  slug,
  title,
}: BreadcrumbSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name.fa,
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: type === "blog" ? "مقالات" : "دوره های آموزشی",
        item: `${site.url}/${type === "blog" ? "blog" : "courses"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${site.url}/${type === "blog" ? "blog" : "courses"}/${slug}`,
      },
    ],
  };
}
