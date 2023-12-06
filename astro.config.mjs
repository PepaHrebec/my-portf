import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import robotsTxt from "astro-robots-txt";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://josefhrebec.cz",
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: ["javascript", "astro", "html"],
      wrap: true,
    },
  },
  integrations: [vue(), robotsTxt(), sitemap()],
});
