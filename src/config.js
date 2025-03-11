// export default {
//   baseURL: "https://localhost:7170/api",
// };

const config = {
    baseURL: process.env.NODE_ENV === "development" 
      ? "https://localhost:7170/api" 
      : "https://your-production-url.com/api"
  };
  
  export default config;
  