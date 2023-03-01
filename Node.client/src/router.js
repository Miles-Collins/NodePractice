import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "@bcwdev/auth0provider-client";

function loadPage(page) {
  return () => import(`./pages/${page}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("HomePage"),
  },
  {
    path: "/about",
    name: "About",
    component: loadPage("AboutPage"),
  },
  {
    path: "/account",
    name: "Account",
    component: loadPage("AccountPage"),
    beforeEnter: authGuard,
  },
  ///////////// NARUTO \\\\\\\\\\\\\\\
  {
    path: "/naruto",
    name: "Naruto",
    component: loadPage("NarutoPage"),
    beforeEnter: authGuard,
  },
  ////////// MY HERO ACADEMIA \\\\\\\\\\\\\
  {
    path: "/myHero",
    name: "MyHero",
    component: loadPage("MyHeroAcademiaPage"),
    beforeEnter: authGuard,
  },
  {
    path: "/myHero/:teamId",
    name: "MHATeam",
    component: loadPage("MHATeamPage"),
    beforeEnter: authGuard,
  },
];

export const router = createRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  history: createWebHashHistory(),
  routes,
});
