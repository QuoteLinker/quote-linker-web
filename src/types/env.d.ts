declare namespace NodeJS {
  interface ProcessEnv {
    ZAPIER_WEBHOOK_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
} 