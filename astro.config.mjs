import { defineConfig, envField } from 'astro/config';

import vercel from '@astrojs/vercel';

import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

export default defineConfig({
  env: {
    schema: {
      TOKEN_URL: envField.string({ context: 'server', access: 'secret' }),
      TOKEN_BODY: envField.string({ context: "server", access: "secret" }),
      STUDENT_URL: envField.string({ context: 'server', access: 'secret'}),
      GRADES_URL: envField.string({ context: 'server', access: 'secret'}),
      STATS_URL: envField.string({ context: 'server', access: 'secret'}),
      SCHEDULE_URL: envField.string({ context: 'server', access: 'secret'})
    }
  },
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: vercel()
});