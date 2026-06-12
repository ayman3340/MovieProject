import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv'
// Load environment variables from .env file
// frontend using yarn dev you will be able to see this on you 
// cmd to know this works! :D
// https://vite.dev/config/
export default defineConfig({
    define: {
      'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY)
    },
  plugins: [react()],
  base:"/MovieProject"
});
