import { lazy, LazyExoticComponent, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes, { RouteConfig } from "./config";
import { Styles } from "../styles/styles";
import React from "react";

const pages: Record<
  RouteConfig['component'],
  LazyExoticComponent<() => JSX.Element>
> = {
  [routes[0].component]: lazy(() => import("../pages/Home"))
}

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Routes>
        <Route
          key={'main-page'}
          path={'/'}
          element={React.createElement(pages[routes[0].component])}
        />
        {routes.map((routeItem: RouteConfig) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              element={React.createElement(pages[routeItem.component])}
            />
          );
        })}
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
