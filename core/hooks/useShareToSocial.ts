import { usePathname } from "next/navigation";
import { site } from "../config";

/**
 * Parameters required for social sharing.
 */
type Params = {
  title: string; // The title of the shared content
  text: string; // The description or body of the shared content
};

/**
 * A custom hook to generate social media sharing URLs for the current page.
 *
 * @param {Params} params - The parameters containing the title and text for sharing.
 * @returns An object containing:
 * - `x`: URL for sharing on X (formerly Twitter).
 * - `telegram`: URL for sharing on Telegram.
 * - `linkedin`: URL for sharing on LinkedIn.
 * - `whatsapp`: URL for sharing on WhatsApp.
 * - `linkAttributes`: Recommended attributes for the sharing links.
 */
export function useShareToSocial({ text, title }: Params) {
  // Get the current pathname from Next.js navigation
  const pathname = usePathname();

  // Construct the full page URL for sharing
  const pageUrl = encodeURIComponent(`${site.url}${pathname}`);

  // Encode the text parameter for URL compatibility
  const textParam = encodeURIComponent(
    `**${title}**\n${text}\n\n${site.slogan}`
  );

  return {
    x: `https://x.com/intent/tweet?url=${pageUrl}&text=${textParam}`, // X (Twitter) share link
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${textParam}`, // Telegram share link
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, // LinkedIn share link
    whatsapp: `https://api.whatsapp.com/send?text=${textParam}%20${pageUrl}`, // WhatsApp share link

    linkAttributes: {
      target: "_blank", // Opens links in a new tab
      rel: "nofollow noreferrer noopener", // Security & SEO best practices
    },
  };
}
