export interface RouteConfig {
  path: string;
  component: string;
}

const routes: RouteConfig[] = [
  {
    path: "/home",
    component: "Home",
  },
];

export default routes;
