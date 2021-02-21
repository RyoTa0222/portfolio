require("dotenv").config();
import createClient from "./plugins/contentful";
import {
  getBlogCategory,
  getLatestBlog,
  getBlogPerCategory,
  getAllBlog,
} from "./utils/blog";

const client = createClient();

const mkHead = (environment = "production") => {
  const meta = [
    { charset: "utf-8" },
    { "http-equiv": "http-equiv", content: "text/html; charset=UTF-8" },
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5",
    },
    {
      hid: "description",
      name: "description",
      content:
        "RyoTaのポートフォリオサイトです。UXを意識したサイトの制作を意識しております。Twitterで発信をしておりますのでご気軽にフォローしてください！",
    },
    { hid: "og:site_name", property: "og:site_name", content: "RyoTa." },
    { hid: "og:type", property: "og:type", content: "website" },
    { hid: "og:url", property: "og:url", content: process.env.SITE_URL },
    { hid: "og:title", property: "og:title", content: "RyoTa." },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "RyoTa.のポートフォリオサイトです。UXを意識したサイトの制作を意識しております。Twitterで発信をしておりますのでご気軽にフォローしてください！",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: process.env.SITE_URL + "/img/ogp.png",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: process.env.SITE_URL + "/img/ogp.png",
    },
    { hid: "twitter:site", name: "twitter:site", content: "@RyoTa___0222" },
  ];
  if (environment === "development") {
    meta.push({ hid: "robots", name: "robots", content: "noindex,nofollow" });
  }
  return meta;
};

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  // env
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    BASE_URL: process.env.BASE_URL,
    SITE_URL: process.env.SITE_URL,
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME || "production",
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: "ja",
      prefix: "og: http://ogp.me/ns#",
    },
    title: "RyoTa.",
    meta: mkHead(process.env.ENVIRONMENT_NAME || "production"),
    link: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: process.env.BASE_URL + "favicon.ico",
      },
      {
        rel: "icon alternate",
        type: "image/png",
        href: process.env.BASE_URL + "favicon.png",
      },
      // apple touch icon
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: process.env.BASE_URL + "img/apple-touch-icon.png",
      },
      // android
      {
        rel: "icon",
        type: "image/png",
        href: process.env.BASE_URL + "img/android-chrome-192x192.png",
      },
    ],
    script: [
      {
        src: "https://use.typekit.net/kpd0goc.js",
      },
    ],
  },
  loading: true,
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  styleResources: {
    scss: ["~/assets/scss/variable.scss"],
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/window.ts", mode: "client" },
    { src: "~/plugins/theme.ts", mode: "client" },
    { src: "~/plugins/prism.ts" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "nuxt-typed-vuex",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://www.npmjs.com/package/@nuxtjs/dotenv
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
    "@nuxtjs/sentry",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],
  router: {
    trailingSlash: true,
  },
  sitemap: {
    path: "/sitemap.xml",
    hostname: process.env.SITE_URL,
    trailingSlash: true,
    routes: async (callback) => {
      // 1. blog関連
      const blog_route = [];
      let blogCategory = null;
      let latestBlog = null;
      // ブログカテゴリのデータの取得
      let entries = await getBlogCategory();
      if (entries.items.length > 0) {
        blogCategory = entries.items;
      }
      // ブログ一覧記事のデータの取得
      const arr = [];
      // 最新の記事
      latestBlog = await getLatestBlog(4);
      // カテゴリごとの記事
      if (blogCategory && blogCategory.length > 0) {
        for (const category of blogCategory) {
          const categoryEntries = await getBlogPerCategory(
            category.fields.categoryId,
            4
          );
          const entries = await getBlogPerCategory(category.fields.categoryId);
          arr.push(categoryEntries);
          // カテゴリごとのblog一覧ページ
          blog_route.push(`/blog/${category.fields.categoryId}/`);
        }
      }
      // 記事詳細ページ
      entries = await getAllBlog();
      for (const entry of entries.items) {
        const categoryId = entry.fields.category.sys.id;
        const categoryItem = entries.includes.Entry.find(
          (item) => item.sys.id === categoryId
        );
        blog_route.push(
          `/blog/${categoryItem.fields.categoryId}/${entry.fields.id}/`
        );
      }
      // 2. portfolio関連
      const portfolio_route = [];
      const portfolio_skill_route = [];
      const s_entries = await client.getEntries({
        content_type: "skillSet",
      });
      if (s_entries.items.length > 0) {
        for (const skill of s_entries.items) {
          portfolio_skill_route.push(`/portfolio/category/${skill.fields.id}/`);
        }
      }
      callback(
        null,
        blog_route
          .concat(portfolio_route)
          .concat(portfolio_skill_route)
          .concat(roadmap_route)
      );
    },
  },
  robots: {
    UserAgent: "*",
    Sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/typed-vuex/],
  },
  generate: {
    fallback: true,
    routes: async (callback) => {
      // 1. blog関連
      const blog_route = [];
      let blogCategory = null;
      let latestBlog = null;
      let blogByCategory = {};
      // ブログカテゴリのデータの取得
      let entries = await getBlogCategory();
      if (entries.items.length > 0) {
        blogCategory = entries.items;
      }
      // ブログ一覧記事のデータの取得
      const arr = [];
      // 最新の記事
      latestBlog = await getLatestBlog(4);
      // カテゴリごとの記事
      if (blogCategory && blogCategory.length > 0) {
        for (const category of blogCategory) {
          const categoryEntries = await getBlogPerCategory(
            category.fields.categoryId,
            4
          );
          const entries = await getBlogPerCategory(category.fields.categoryId);
          arr.push(categoryEntries);
          // カテゴリごとのblog一覧ページ
          blog_route.push({
            route: `/blog/${category.fields.categoryId}/`,
            payload: entries,
          });
        }
      }
      if (blogCategory && blogCategory.length > 0) {
        for (let i = 0; i < blogCategory.length; i++) {
          const categoryId = blogCategory[i].fields.categoryId;
          const item = arr[i];
          blogByCategory[categoryId] = item;
        }
      }
      // blogのトップページ
      blog_route.push({
        route: "/blog/",
        payload: { blogCategory, latestBlog, blogByCategory },
      });
      // 記事詳細ページ
      entries = await getAllBlog();
      for (const entry of entries.items) {
        const categoryId = entry.fields.category.sys.id;
        const categoryItem = entries.includes.Entry.find(
          (item) => item.sys.id === categoryId
        );
        blog_route.push({
          route: `/blog/${categoryItem.fields.categoryId}/${entry.fields.id}/`,
          payload: {
            entry,
            includes: entries.includes,
          },
        });
      }
      // 2. portfolio関連
      const portfolio_route = [];
      const portfolio_skill_route = [];
      const s_entries = await client.getEntries({
        content_type: "skillSet",
      });
      const p_entries = await client.getEntries({
        content_type: "portfolio",
      });
      if (s_entries.items.length > 0) {
        for (const skill of s_entries.items) {
          portfolio_skill_route.push({
            route: `/portfolio/category/${skill.fields.id}/`,
            payload: {
              skills: s_entries.items,
              contents: p_entries.items,
              skillName: skill.fields.name,
            },
          });
        }
      }
      portfolio_route.push(
        {
          route: "/portfolio/",
          payload: {
            skills: s_entries.items,
            contents: p_entries.items,
          },
        },
        {
          route: "/portfolio/year/",
          payload: {
            skills: s_entries.items,
            contents: p_entries.items,
          },
        }
      );
      console.log(portfolio_skill_route);
      // 3. roadmap関連
      const roadmap_route = [];
      entries = await client.getEntries({
        content_type: "roadmap",
      });
      roadmap_route.push({
        route: "/roadmap/",
        payload: {
          ctfData: entries.items,
        },
      });
      callback(
        null,
        blog_route
          .concat(portfolio_route)
          .concat(portfolio_skill_route)
          .concat(roadmap_route)
      );
    },
  },
};
