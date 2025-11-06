// Domain configuration for the application
// Marketing site: daddy-leads.com
// App/Dashboard: app.daddy-leads.com

const isDevelopment = import.meta.env.DEV;
const customScraperDomain = import.meta.env.VITE_SCRAPER_API_DOMAIN;

// Marketing domain (base domain)
export const MARKETING_DOMAIN = isDevelopment ? "" : "https://daddy-leads.com";

// App domain (subdomain)
export const APP_DOMAIN = isDevelopment ? "" : "https://app.daddy-leads.com";

// API domains
export const MAIN_API_DOMAIN = isDevelopment ? "http://localhost:5000" : "https://api.daddy-leads.com";

export const SCRAPER_API_DOMAIN = isDevelopment ? "http://localhost:3001" : "https://api.daddy-leads.com";

export const SCRAPER_API_DOMAIN =
  customScraperDomain || (isDevelopment ? "http://localhost:3001" : "https://api.daddy-leads.com");

// Authentication URLs (on app subdomain)
export const LOGIN_URL = `${APP_DOMAIN}/access?p=login`;
export const SIGNUP_URL = `${APP_DOMAIN}/access?p=signup`;
export const DASHBOARD_URL = `${APP_DOMAIN}/dashboard`;
