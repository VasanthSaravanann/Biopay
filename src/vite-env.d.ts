/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional URL that accepts `POST { email }` for the beta waitlist. */
  readonly VITE_WAITLIST_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
