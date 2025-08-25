import { Metadata } from "next";

interface PageMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export function generateMetadata({
  title = "Hallpass Tracker for K-12 | Secure Digital Hall Passes & Analytics",
  description = "Securely track student hall passes in real time. FERPA/COPPA-aware, admin controls, and analytics to transform hallway management.",
  keywords = ["hall pass", "k-12", "school safety", "digital passes", "student tracking", "education technology"],
  image = "/og-image.jpg",
  url = "https://hallpass.com",
  type = "website"
}: PageMetadataProps): Metadata {
  const fullTitle = title.includes("Hallpass") ? title : `${title} | Hallpass`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Hallpass Team" }],
    creator: "Hallpass",
    publisher: "Hallpass",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Hallpass Tracker for K-12",
      description: "Digital hall passes with real-time visibility and actionable analytics.",
      url,
      siteName: "Hallpass",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@hallpass",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-site-verification-code",
    },
  };
}
