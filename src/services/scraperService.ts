// LinkedIn Sales Navigator Scraper API service
import { SCRAPER_API_DOMAIN } from '@/config/domains';

const BASE_PATH = '/v1/scraper/salesnav';

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

  private async request(endpoint: string, init: RequestInit): Promise<ScraperResponse> {
    const url = `${SCRAPER_API_DOMAIN}${BASE_PATH}${endpoint}`;
    
    try {
      const res = await fetch(url, init);
      const json = await res.json().catch(() => ({ 
        success: false, 
        message: `Request failed (${res.status})` 
      }));

      return json as ScraperResponse;
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Network error',
      };
    }
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
