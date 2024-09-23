import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import storyblok from '@storyblok/astro';
import vercelServerless from '@astrojs/vercel/serverless';
import { isPreview } from './src/utils/isPreview';

export default defineConfig({
  integrations: [
    vue(),
    tailwind(),
    storyblok({
      accessToken: import.meta.env.STORYBLOK_API_KEY,
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
  adapter: vercelServerless()
});
