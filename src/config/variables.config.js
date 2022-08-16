const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT || 3040,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG,
  CORS: process.env.CORS?.split(',') || '*',

  MONGODB: {
    URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test_quiz'
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || '1h',
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME || '12h'
  },

  EMAIL: {
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
    SERVICE: process.env.EMAIL_SERVICE,
    USERNAME: process.env.EMAIL_USERNAME,
    PASSWORD: process.env.EMAIL_PASSWORD
  }

};

export default config;
