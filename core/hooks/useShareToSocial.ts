import { usePathname } from "next/navigation";
import { site } from "../config";

type Params = {
  title: string;
  text: string;
};

export function useShareToSocial({ text, title }: Params) {
  const pathname = usePathname();

  const pageUrl = `${site.url}${pathname}`;

  const textParam = `**${title}**%0A${text}%0A%0A ${site.slogan}`;

  return {
    x: `https://x.com/intent/tweet?url=${pageUrl}&text=${textParam}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${textParam}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${textParam}%20${pageUrl}`,

    linkAttributes: {
      target: "_blank",
      rel: "nofollow noreferrer noopener",
    },
  };
}
