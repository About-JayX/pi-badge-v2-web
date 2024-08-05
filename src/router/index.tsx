import { lazy, Suspense, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import lang from "@/config/locale";
import { ImportMetaGlobType, RouterDataType } from "@/router/type";

// Define parameters for dynamic routes
const param: Record<string, string[]> = { "/": ["userid"] };

// Import components dynamically
const view = import.meta.glob<ImportMetaGlobType>("@/view/*.tsx");

// Generate route objects for pages
const generateRoutes = (
  pages: [string, () => Promise<{ default: React.ComponentType }>][]
): RouterDataType[] => {
  return pages.map(([path, page]) => {
    const componentName = path.split("/").pop()?.replace(/.tsx$/, "") ?? "";
    const routePath = componentName === "index" ? "/" : `/${componentName.toLowerCase()}`;

    const Component = lazy(() => page().then((module) => ({ default: module.default })));

    return {
      path: routePath,
      element: <Component />,
    };
  });
};

// Fallback component for Suspense
const LoadingFallback = () => <div>Loading...</div>;

export default function Router() {
  const { i18n } = useTranslation();

  // Generate routes
  const routes = useMemo(() => generateRoutes(Object.entries(view)), []);

  // Generate language-specific routes
  const langRoutes = useMemo(() => {
    const supportedLangs = Object.keys(lang);

    return supportedLangs.flatMap((langKey) => {
      return routes.flatMap((route) => {
        const params =
          param[route.path]?.length > 0
            ? `:${param[route.path].join("/:")}`
            : "";
        
        return [
          { ...route, path: `/${langKey}${route.path}` },
          { ...route, path: `${route.path}${params}` },
          { ...route, path: `/${langKey}${route.path}${params}` }
        ];
      });
    });
  }, [routes]);

  // Combine all routes
  const allRoutes = useMemo(() => [...routes, ...langRoutes], [routes, langRoutes]);

  // Ensure the current language is supported
  useEffect(() => {
    const supportedLangs = Object.keys(lang);
    if (!supportedLangs.includes(i18n.language)) {
      i18n.changeLanguage(supportedLangs[0]);
    }
  }, [i18n.language]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
