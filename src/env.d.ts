declare namespace NodeJS {
    interface ProcessEnv {
      readonly  VITE_CLOUD_NAME: string;
      readonly  VITE_API_SECRET: string;
      // Agrega aquí otras variables de entorno según sea necesario
    }
  }
  interface ImportMeta {
    readonly env: ProcessEnv;
  }