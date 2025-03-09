const config = {
    baseURL: process.env.NODE_ENV === "development" 
      ? "https://localhost:44340/api" 
      : "https://your-production-url.com/api"
  };
  
  export default config;
  