"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "BreadcrumbList" | "Course";
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const pathname = usePathname();
  const t = useTranslations();

  const baseData = {
    "@context": "https://schema.org",
    "@id": "https://eduviz.cn/#organization",
  };

  const renderData = () => {
    switch (type) {
      case "Organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "eduVizual",
          url: "https://eduviz.cn",
          logo: {
            "@type": "ImageObject",
            url: "https://eduviz.cn/icon-512.png",
            width: 512,
            height: 512,
          },
          sameAs: [
            "https://github.com/eduvizual",
            "https://twitter.com/eduviz",
          ],
        };

      case "WebSite":
        return {
          ...baseData,
          "@type": "WebSite",
          name: "eduVizual",
          url: "https://eduviz.cn",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://eduviz.cn/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "BreadcrumbList": {
        const segments = pathname.split("/").filter(Boolean);
        const breadcrumbs = [{ "@type": "ListItem", position: 1, name: "首页", item: "https://eduviz.cn" }];

        let accumulatedPath = "";
        segments.forEach((segment, index) => {
          accumulatedPath += "/" + segment;
          const position = index + 2;

          if (segment === "subjects") {
            const subjectName = t("subjects.title") || "学科";
            breadcrumbs.push({
              "@type": "ListItem",
              position,
              name: subjectName,
              item: accumulatedPath,
            });
          } else if (segment.startsWith("math") || segment.startsWith("physics") || segment.startsWith("chemistry")) {
            const subjectName = t(`${segment}.title`) || segment;
            breadcrumbs.push({
              "@type": "ListItem",
              position,
              name: subjectName,
              item: accumulatedPath,
            });
          }
        });

        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs,
        };
      }

      case "Course":
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          name: data?.title as string,
          description: data?.description as string,
          courseMode: "Interactive",
          provider: {
            "@type": "Organization",
            name: "eduVizual",
            sameAs: "https://eduviz.cn",
          },
          educationalLevel: data?.learningStage as string,
          inLanguage: data?.language || "zh-CN",
        };

      default:
        return null;
    }
  };

  const jsonLd = renderData();
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
