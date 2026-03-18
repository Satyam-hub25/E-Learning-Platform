declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NEXT_PUBLIC_API_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }

  // For MongoDB caching
  var mongoose: {
    conn: any | null;
    promise: Promise<any> | null;
  };
}