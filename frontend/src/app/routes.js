/*

Copyright (c) 2018 - 2025 PhotoPrism UG. All rights reserved.

    This program is free software: you can redistribute it and/or modify
    it under Version 3 of the GNU Affero General Public License (the "AGPL"):
    <https://docs.photoprism.app/license/agpl>

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    The AGPL is supplemented by our Trademark and Brand Guidelines,
    which describe how our Brand Assets may be used:
    <https://www.photoprism.app/trademark>

Feel free to send an email to hello@photoprism.app if you have questions,
want to support our work, or just want to say hello.

Additional information can be found in our Developer Guide:
<https://docs.photoprism.app/developer-guide/>

*/

import Photos from "page/photos.vue";
import Albums from "page/albums.vue";
import AlbumPhotos from "page/album/photos.vue";
import Places from "page/places.vue";
import Browse from "page/library/browse.vue";
import Errors from "page/library/errors.vue";
import Labels from "page/labels.vue";
import People from "page/people.vue";
import Library from "page/library.vue";
import Settings from "page/settings.vue";
import Admin from "page/admin.vue";
import Login from "page/auth/login.vue";
import Discover from "page/discover.vue";
import About from "page/about/about.vue";
import Feedback from "page/about/feedback.vue";
import License from "page/about/license.vue";
import Help from "page/help.vue";
import Connect from "page/connect.vue";
import { $gettext } from "common/gettext";
import { $config, $session } from "./session";

const c = window.__CONFIG__;
const siteTitle = c.siteTitle ? c.siteTitle : c.name;
const loginRoute = "login";

export default [
  {
    name: "home",
    path: "/",
    redirect: () => {
      return { name: $session.getDefaultRoute() };
    },
  },
  {
    name: "about",
    path: "/about",
    component: About,
    meta: { title: $gettext("About"), requiresAuth: false },
  },
  {
    name: "license",
    path: "/license",
    component: License,
    meta: { title: $gettext("License"), requiresAuth: false },
  },
  {
    name: "feedback",
    path: "/feedback",
    component: Feedback,
    meta: { title: $gettext("Help & Support"), requiresAuth: true },
  },
  {
    name: "help",
    path: "/help/:pathMatch(.*)*",
    component: Help,
    meta: { title: $gettext("Help & Support"), requiresAuth: false },
  },
  {
    name: loginRoute,
    path: "/login",
    component: Login,
    meta: { title: siteTitle, requiresAuth: false, hideNav: true },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next();
      } else {
        next({ name: $session.getDefaultRoute() });
      }
    },
  },
  {
    name: "admin",
    path: "/admin/:pathMatch(.*)*",
    component: Admin,
    meta: {
      title: $gettext("Settings"),
      requiresAuth: true,
      admin: true,
      settings: true,
      background: "background",
    },
  },
  {
    name: "upgrade",
    path: "/upgrade",
    component: Connect,
    meta: {
      title: siteTitle,
      requiresAuth: true,
      admin: true,
      settings: true,
    },
  },
  {
    name: "connect",
    path: "/upgrade/:token",
    component: Connect,
    meta: {
      title: siteTitle,
      requiresAuth: true,
      admin: true,
      settings: true,
    },
  },
  {
    name: "browse",
    path: "/browse",
    component: Photos,
    meta: { title: siteTitle, icon: true, requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("photos", "search")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "all",
    path: "/all",
    component: Photos,
    meta: { title: siteTitle, requiresAuth: true },
    props: { staticFilter: { quality: "0" } },
  },
  {
    name: "photos",
    path: "/photos",
    component: Photos,
    meta: { title: $gettext("Photos"), requiresAuth: true },
    props: { staticFilter: { photo: "true" } },
  },
  {
    name: "moments",
    path: "/moments",
    component: Albums,
    meta: { title: $gettext("Moments"), requiresAuth: true },
    props: { view: "moment", defaultOrder: "newest", staticFilter: { type: "moment" } },
  },
  {
    name: "moment",
    path: "/moments/:album/:slug",
    component: AlbumPhotos,
    meta: { collectionTitle: "Moments", collectionRoute: "moments", requiresAuth: true },
  },
  {
    name: "albums",
    path: "/albums",
    component: Albums,
    meta: { title: $gettext("Albums"), requiresAuth: true },
    props: { view: "album", defaultOrder: "favorites", staticFilter: { type: "album" } },
  },
  {
    name: "album",
    path: "/albums/:album/:slug",
    component: AlbumPhotos,
    meta: { collectionTitle: "Albums", collectionRoute: "albums", requiresAuth: true },
  },
  {
    name: "calendar",
    path: "/calendar",
    component: Albums,
    meta: { title: $gettext("Calendar"), requiresAuth: true },
    props: { view: "month", defaultOrder: "newest", staticFilter: { type: "month" } },
  },
  {
    name: "month",
    path: "/calendar/:album/:slug",
    component: AlbumPhotos,
    meta: { collectionTitle: "Calendar", collectionRoute: "calendar", requiresAuth: true },
  },
  {
    name: "folders",
    path: "/folders",
    component: Albums,
    meta: { title: $gettext("Folders"), requiresAuth: true },
    props: { view: "folder", defaultOrder: "name", staticFilter: { type: "folder" } },
  },
  {
    name: "folder",
    path: "/folders/:album/:slug",
    component: AlbumPhotos,
    meta: { collectionTitle: "Folders", collectionRoute: "folders", requiresAuth: true },
  },
  {
    name: "unsorted",
    path: "/unsorted",
    component: Photos,
    meta: { title: $gettext("Unsorted"), requiresAuth: true },
    props: { staticFilter: { unsorted: "true" } },
  },
  {
    name: "favorites",
    path: "/favorites",
    component: Photos,
    meta: { title: $gettext("Favorites"), requiresAuth: true },
    props: { staticFilter: { favorite: "true" } },
  },
  {
    name: "live",
    path: "/live",
    component: Photos,
    meta: { title: $gettext("Live"), requiresAuth: true },
    props: { staticFilter: { live: "true" } },
  },
  {
    name: "videos",
    path: "/videos",
    component: Photos,
    meta: { title: $gettext("Videos"), requiresAuth: true },
    props: { staticFilter: { video: "true" } },
  },
  {
    name: "review",
    path: "/review",
    component: Photos,
    meta: { title: $gettext("Review"), requiresAuth: true },
    props: { staticFilter: { review: "true" } },
  },
  {
    name: "private",
    path: "/private",
    component: Photos,
    meta: { title: $gettext("Private"), requiresAuth: true },
    props: { staticFilter: { private: "true" } },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("photos", "access_private")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "archive",
    path: "/archive",
    component: Photos,
    meta: { title: $gettext("Archive"), requiresAuth: true },
    props: { staticFilter: { archived: "true" } },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("photos", "delete")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "places",
    path: "/places",
    component: Places,
    meta: { title: $gettext("Places"), requiresAuth: true },
  },
  {
    name: "places_view",
    path: "/places/view/:s",
    component: Places,
    meta: { title: $gettext("Places"), requiresAuth: true },
  },
  {
    name: "places_browse",
    path: "/places/browse",
    component: Photos,
    meta: { title: $gettext("Places"), requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("photos", "search")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "states",
    path: "/states",
    component: Albums,
    meta: { title: $gettext("Places"), requiresAuth: true },
    props: { view: "state", defaultOrder: "place", staticFilter: { type: "state" } },
  },
  {
    name: "state",
    path: "/states/:album/:slug",
    component: AlbumPhotos,
    meta: { collectionTitle: $gettext("Regions"), collectionRoute: "states", requiresAuth: true },
  },
  {
    name: "files",
    path: "/index/files/:pathMatch(.*)*",
    component: Browse,
    meta: { title: $gettext("File Browser"), requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("files", "access_library") || $config.deny("files", "access_private")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "hidden",
    path: "/hidden",
    component: Photos,
    meta: { title: $gettext("Hidden Files"), requiresAuth: true },
    props: { staticFilter: { hidden: "true" } },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("files", "access_library") || $config.deny("files", "access_private")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "errors",
    path: "/errors",
    component: Errors,
    meta: { title: $gettext("Errors"), requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("logs", "access_all")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "labels",
    path: "/labels",
    component: Labels,
    meta: { title: $gettext("Labels"), requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("labels", "search")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "people",
    path: "/people",
    component: People,
    meta: { title: $gettext("People"), requiresAuth: true, background: "background" },
    beforeEnter: (to, from, next) => {
      if (!$config || !from || !from.name || from.name.startsWith("people")) {
        next();
      } else {
        $config.load().finally(() => {
          // Open new faces tab when there are no people.
          if ($config.values.count.people === 0) {
            if ($config.allow("people", "manage")) {
              next({ name: "people_faces" });
            } else {
              next({ name: "albums" });
            }
          } else {
            next();
          }
        });
      }
    },
  },
  {
    name: "people_faces",
    path: "/people/new",
    component: People,
    meta: { title: $gettext("People"), requiresAuth: true, background: "background" },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("people", "manage")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "library_index",
    path: "/index",
    component: Library,
    meta: { title: $gettext("Library"), requiresAuth: true, background: "background" },
    props: { tab: "library_index" },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("files", "manage")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "library_import",
    path: "/import",
    component: Library,
    meta: { title: $gettext("Library"), requiresAuth: true, background: "background" },
    props: { tab: "library_import" },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("files", "manage")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "library_logs",
    path: "/logs",
    component: Library,
    meta: { title: $gettext("Library"), requiresAuth: true, background: "background" },
    props: { tab: "library_logs" },
    beforeEnter: (to, from, next) => {
      if ($session.loginRequired()) {
        next({ name: loginRoute });
      } else if ($config.deny("logs", "access_all")) {
        next({ name: $session.getDefaultRoute() });
      } else {
        next();
      }
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    meta: {
      title: $gettext("Settings"),
      requiresAuth: true,
      settings: true,
      background: "background",
    },
    props: { tab: "settings_general" },
  },
  {
    name: "settings_content",
    path: "/settings/content",
    component: Settings,
    meta: {
      title: $gettext("Settings"),
      requiresAuth: true,
      settings: true,
      background: "background",
    },
    props: { tab: "settings_content" },
  },
  {
    name: "settings_media",
    path: "/settings/media",
    redirect: "/settings/content",
  },
  {
    name: "settings_advanced",
    path: "/settings/advanced",
    component: Settings,
    meta: {
      title: $gettext("Settings"),
      requiresAuth: true,
      admin: true,
      settings: true,
      background: "background",
    },
    props: { tab: "settings_advanced" },
  },
  {
    name: "settings_services",
    path: "/settings/services",
    component: Settings,
    meta: {
      title: $gettext("Settings"),
      requiresAuth: true,
      admin: true,
      settings: true,
      background: "background",
    },
    props: { tab: "settings_services" },
  },
  {
    name: "settings_account",
    path: "/settings/account",
    component: Settings,
    meta: {
      title: $gettext("Settings"),
      requiresAuth: true,
      settings: true,
      background: "background",
    },
    props: { tab: "settings_account" },
  },
  {
    name: "discover",
    path: "/discover",
    component: Discover,
    meta: { title: $gettext("Discover"), requiresAuth: true, background: "background" },
    props: { tab: 0 },
  },
  {
    name: "discover_similar",
    path: "/discover/similar",
    component: Discover,
    meta: { title: $gettext("Discover"), requiresAuth: true, background: "background" },
    props: { tab: 1 },
  },
  {
    name: "discover_season",
    path: "/discover/season",
    component: Discover,
    meta: { title: $gettext("Discover"), requiresAuth: true, background: "background" },
    props: { tab: 2 },
  },
  {
    name: "discover_random",
    path: "/discover/random",
    component: Discover,
    meta: { title: $gettext("Discover"), requiresAuth: true, background: "background" },
    props: { tab: 3 },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/albums",
  },
];
