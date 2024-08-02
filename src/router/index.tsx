import { lazy, Suspense, useEffect,useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import lang from "@/config/locale";
import { ImportMetaGlobType, RouterDataType } from "@/router/type";

const view = import.meta.glob<ImportMetaGlobType>("@/view/*.tsx");

const generateRoutes = (
  pages: [string, () => Promise<{ default: React.ComponentType }>][]
): RouterDataType[] => {
  return pages.map(([path, page]) => {
    const componentName = path.split("/").pop()?.replace(/.tsx$/, "") ?? "";
    const routePath =
      componentName === "index" ? "/" : `/${componentName.toLowerCase()}`;

    const Component = lazy(() =>
      page().then((module) => ({ default: module.default }))
    );

    return {
      path: routePath,
      element: <Component />,
    };
  });
};

const LoadingFallback = () => <div></div>;

export default function Router() {
  const { i18n } = useTranslation();

  const routes = useMemo(() => generateRoutes(Object.entries(view)), []);

  const langRoutes = useMemo(() => {
    const supportedLangs = Object.keys(lang);
    return supportedLangs.flatMap((langKey) =>
      routes.map((route) => ({
        ...route,
        path: `/${langKey}${route.path}`,
      }))
    );
  }, [routes]);

  const allRoutes = useMemo(
    () => [...routes, ...langRoutes],
    [routes, langRoutes]
  );

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
