declare namespace NodeJS {
    interface ProcessEnv {
        REACT_CLOUD_NAME: string;
        REACT_API_SECRET: string;
      // Agrega aquí otras variables de entorno según sea necesario
    }
  }
  interface ImportMeta {
    readonly env: ProcessEnv;
  }