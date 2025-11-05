// LinkedIn Scraper API service
import { SCRAPER_API_DOMAIN } from '@/config/domains';

// Preferred base paths (support both kebab and non-kebab for safety)
const SCRAPER_PATHS = ['/v1/scraper/salesnav', '/v1/scraper/sales-nav'];

interface ScraperResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

class ScraperService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // Build candidate URLs with graceful fallbacks
  private getCandidateUrls(endpoint: string): string[] {
    const domains = [SCRAPER_API_DOMAIN, 'http://localhost:3001'];
    const urls: string[] = [];

    for (const domain of domains) {
      for (const path of SCRAPER_PATHS) {
        urls.push(`${domain}${path}${endpoint}`);
      }
    }

    // De-duplicate
    return Array.from(new Set(urls));
  }

  // Generic request with retries across candidates
  private async request(endpoint: string, init: RequestInit): Promise<ScraperResponse> {
    const candidates = this.getCandidateUrls(endpoint);

    for (const url of candidates) {
      try {
        const res = await fetch(url, init);
        // Try to parse JSON if possible
        const json = await res
          .json()
          .catch(() => ({ success: false, message: `Request failed (${res.status})` }));

        if (res.ok) return json as ScraperResponse;
        if (res.status === 404) continue; // try next candidate
        return json as ScraperResponse; // return first non-404 JSON error
      } catch (err) {
        // network error: try next candidate
        continue;
      }
    }

    return {
      success: false,
      message: 'API endpoint not found',
    };
  }

  async saveCookie(cookie: string): Promise<ScraperResponse> {
    return this.request('/cookie', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ cookie }),
    });
  }

  async getCookie(): Promise<ScraperResponse> {
    return this.request('/cookie', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async deleteCookie(): Promise<ScraperResponse> {
    return this.request('/cookie', {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
  }

  async startScraper(url: string, listName: string): Promise<ScraperResponse> {
    return this.request('/start', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ url, listName }),
    });
  }

  async pauseScraper(): Promise<ScraperResponse> {
    return this.request('/pause', {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
  }
}

export const scraperService = new ScraperService();
