/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITEKEY: string
  readonly TURNSTILE_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
