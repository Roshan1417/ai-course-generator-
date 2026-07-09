/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_7J2VgCQYTGwq@ep-solitary-dawn-a8hqurgm-pooler.eastus2.azure.neon.tech/Ai-Course-Generator%20?sslmode=require&channel_binding=require',
    }
  };