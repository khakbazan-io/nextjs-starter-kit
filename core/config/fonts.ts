import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Vazirmatn,
} from "next/font/google";

import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontVazirmatn = Vazirmatn({
  subsets: ["latin"],
  variable: "--font-vazirmatn",
});

export const fontYekan = localFont({
  variable: "--font-iranyekan",
  src: [
    {
      path: "../../public/yekanFont/IRANYekanWebExtraBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/yekanFont/IRANYekanWebBlack.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/yekanFont/IRANYekanWebExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/yekanFont/IRANYekanWebBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/yekanFont/IRANYekanWebMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/yekanFont/IRANYekanWebRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/yekanFont/IRANYekanWebThin.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
});
