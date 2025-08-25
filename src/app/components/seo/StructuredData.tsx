interface StructuredDataProps {
  type: "website" | "organization" | "product" | "article";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.name || "LandingPage",
          description: data.description || "Build amazing web experiences with our powerful platform",
          url: data.url || "https://landingpage.com",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${data.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: data.name || "LandingPage",
          url: data.url || "https://landingpage.com",
          logo: data.logo || "https://landingpage.com/logo.png",
          description: data.description || "Building the future of web experiences",
          sameAs: data.socialLinks || [
            "https://twitter.com/landingpage",
            "https://linkedin.com/company/landingpage",
            "https://github.com/landingpage"
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: data.phone || "+1-555-0123",
            contactType: "customer service",
            email: data.email || "support@landingpage.com",
            availableLanguage: "en",
          },
        };

      case "product":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: data.name || "Hallpass",
          description: data.description || "Secure digital hall passes for K-12 schools",
          url: data.url || "https://hallpass.com",
          applicationCategory: "EducationApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              valueAddedTaxIncluded: false,
            },
            includesObject: [
              {
                "@type": "Offer",
                name: "Teacher",
                price: "9",
                priceCurrency: "USD",
                description: "Individual teacher access"
              },
              {
                "@type": "Offer",
                name: "School",
                price: "149",
                priceCurrency: "USD",
                description: "School-wide solution"
              },
              {
                "@type": "Offer",
                name: "District",
                description: "Multi-school districts - Contact for pricing"
              }
            ]
          },
          privacyPolicy: data.privacyPolicy || "/legal/privacy",
          termsOfService: data.termsOfService || "/legal/terms",
          provider: {
            "@type": "Organization",
            name: "Hallpass",
            url: data.url || "https://hallpass.com"
          },
          featureList: data.features || [
            "Secure Digital Passes",
            "Real-Time Dashboard",
            "Analytics & Trends",
            "FERPA/COPPA Compliance"
          ],
        };

      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.headline,
          description: data.description,
          image: data.image,
          datePublished: data.datePublished,
          dateModified: data.dateModified,
          author: {
            "@type": "Person",
            name: data.author,
          },
          publisher: {
            "@type": "Organization",
            name: data.publisher || "LandingPage",
            logo: {
              "@type": "ImageObject",
              url: data.publisherLogo || "https://landingpage.com/logo.png",
            },
          },
        };

      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2),
      }}
    />
  );
}

// Pre-configured components for common use cases
export function WebsiteStructuredData() {
  return (
    <StructuredData
      type="website"
      data={{
        name: "LandingPage",
        description: "Create stunning web applications with our powerful platform. From concept to launch in minutes, not months.",
        url: "https://landingpage.com",
      }}
    />
  );
}

export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="organization"
      data={{
        name: "LandingPage",
        description: "Building the future of web experiences with modern design and powerful functionality.",
        url: "https://landingpage.com",
        phone: "+1-555-LANDING",
        email: "support@landingpage.com",
        socialLinks: [
          "https://twitter.com/landingpage",
          "https://linkedin.com/company/landingpage",
          "https://github.com/landingpage"
        ],
      }}
    />
  );
}

export function ProductStructuredData() {
  return (
    <StructuredData
      type="product"
      data={{
        name: "LandingPage Platform",
        description: "A powerful platform for building web applications with advanced analytics, security, and collaboration features.",
        url: "https://landingpage.com",
        price: "29",
        priceValidUntil: "2025-12-31",
        rating: "4.8",
        reviewCount: "1000",
        features: [
          "Lightning Fast Deployment",
          "Enterprise Security",
          "Advanced Analytics",
          "Team Collaboration",
          "24/7 Support"
        ],
      }}
    />
  );
}
