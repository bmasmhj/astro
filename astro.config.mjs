import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mkcert from 'vite-plugin-mkcert';
import tailwind from '@astrojs/tailwind';
import storyblok from '@storyblok/astro';
import vercelServerless from '@astrojs/vercel/serverless';
import { loadEnv } from 'vite';
import { isPreview } from './src/utils/isPreview';

const { STORYBLOK_API_KEY, STORYBLOK_LOCAL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const isLocal = STORYBLOK_LOCAL === "true";

export default defineConfig({
  integrations: [
    vue(),
    tailwind(),
    storyblok({
      accessToken: STORYBLOK_API_KEY,
      livePreview: isPreview,
      enableFallbackComponent: true,
      components: {
        default_page: "storyblok/DefaultPage",
        hero_section: "storyblok/HeroSection",
        grid: "storyblok/FeaturedSection",
        newsletter: "storyblok/NewsletterSection",
        technology: "storyblok/TechnologySection",
      }
    }),
  ],

  output: "server",

  ...(isLocal && {
    vite: {
      server: {
        https: true,
      },
      plugins: [mkcert()],
      build: {
        rollupOptions: {
          onwarn(warning, warn) {
            // Silence certain warnings (example: "THIS_IS_UNDEFINED")
            if (warning.code === 'THIS_IS_UNDEFINED') return;
            warn(warning); // let others pass through
          },
        },
      }
    },
  }),

  adapter: vercelServerless()
});
