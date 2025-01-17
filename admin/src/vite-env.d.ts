/// <reference types="vite/client" />
declare module "bytemd/lib/locales/*" {
  export const a: any;
}

interface ImportMetaEnv {
  /** API接口地址*/
  readonly VITE_API_HOST: string;
  /** 网站名称*/
  readonly VITE_SITE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
