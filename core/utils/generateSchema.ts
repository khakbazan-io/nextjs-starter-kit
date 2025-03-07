import { site } from "../config";
import { toIsoDate } from "./toIsoDate";

/**
 * Properties required to generate an Article Schema.
 */
type ArticleSchemaProps = {
  title: string; // Title of the article
  description: string; // Short description of the article
  slug: string; // URL slug of the article
  createdAt: number; // Creation timestamp (milliseconds)
  updatedAt: number; // Last modified timestamp (milliseconds)
  image: string; // Image URL for the article
};

/**
 * Properties required to generate a Course Schema.
 */
type CourseSchemaProps = {
  title: string; // Title of the course
  description: string; // Course description
  slug: string; // URL slug of the course
  createdAt: number; // Creation timestamp (milliseconds)
  image: string; // Course cover image URL
  offPrice: string; // Discounted price (as a string)
  category: string; // Course category
  schema: {
    about: string; // Brief description of the course topic
    requirements: string; // Course prerequisites
    audience: string; // Target audience
    neededTimeInWeek: string; // Recommended weekly study time
  };
};

/**
 * Properties required to generate a Breadcrumb Schema.
 */
type BreadcrumbSchemaProps = {
  title: string; // The name of the current page
  slug: string; // The page slug
  type: "course" | "blog"; // Page type (blog article or course)
};

/**
 * Generates structured **Course Schema** for SEO and search engine understanding.
 *
 * @param {CourseSchemaProps} params - Course data for generating schema.
 * @returns {object} A structured **Course Schema (JSON-LD)**.
 */
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
      price: Number(offPrice) * 10, // Convert to Iranian Rial (IRR)
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

/**
 * Generates structured **Article Schema** for SEO and search engines.
 *
 * @param {ArticleSchemaProps} params - Article data for generating schema.
 * @returns {object} A structured **Article Schema (JSON-LD)**.
 */
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

/**
 * Generates structured **Breadcrumb Schema** for better navigation and SEO.
 *
 * @param {BreadcrumbSchemaProps} params - Breadcrumb data for schema generation.
 * @returns {object} A structured **Breadcrumb Schema (JSON-LD)**.
 */
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
