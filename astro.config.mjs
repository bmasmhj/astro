import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mkcert from 'vite-plugin-mkcert';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';
import storyblok from '@storyblok/astro';
import { isPreview } from './src/utils/isPreview';
import vercel from "@astrojs/vercel/serverless";
const {STORYBLOK_API_KEY , STORYBLOK_LOCAL } = loadEnv(process.env.NODE_ENV, process.cwd() , "");
const isLocal = STORYBLOK_LOCAL === "true";
export default defineConfig({
  integrations: [vue(), tailwind(), 
    //  add storyblok integration
    storyblok({
        accessToken: STORYBLOK_API_KEY,
        livePreview : isPreview,
        enableFallbackComponent : true,
        components : {
          default_page : "storyblok/DefaultPage",
          hero_section : "storyblok/HeroSection",
          grid : "storyblok/FeaturedSection",
          newsletter : "storyblok/NewsletterSection",
          technology : "storyblok/TechnologySection",

        }
    }),
  ],

  output : "server",

  ...(isLocal && { vite : {
    server : {
        https : true
    },
    plugins : [mkcert()]
  }}),

  adapter: vercel(isPreview ? {} :{
    isr : {
      expiration : 60,
    }
  })
});