import "@/index.css";
import Providers from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stfcontainer.nl";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "STF Container B.V.",
    template: "%s | STF Container B.V.",
  },
  description:
    "STF Container B.V. levert nieuwe en gebruikte zeecontainers voor opslag, transport, bouw en industrie.",
  verification: {
    google: "8cD91-szblcNNLAMrnZvL0FX7g4Ye7fIOeqhlR-aZZ0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
