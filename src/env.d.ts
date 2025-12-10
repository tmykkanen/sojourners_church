interface ImportMetaEnv {
  readonly MAILCHIMP_API_KEY: string;
  readonly MAILCHIMP_SERVER_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
