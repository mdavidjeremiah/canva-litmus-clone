export const config = {
  port: parseInt(process.env.API_PORT || "3001", 10),
  host: process.env.API_HOST || "localhost",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL || "",
  storage: {
    type: (process.env.STORAGE_TYPE as "local" | "s3") || "local",
    path: process.env.STORAGE_PATH || "./storage",
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760", 10),
    allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || "image/jpeg,image/png,image/gif,image/webp").split(
      ","
    ),
  },
};
