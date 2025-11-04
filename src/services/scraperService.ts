// LinkedIn Scraper API service
const SCRAPER_API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/v1/scraper/salesnav' 
  : 'https://api.daddy-leads.com/v1/scraper/salesnav';

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

  async saveCookie(cookie: string): Promise<ScraperResponse> {
    try {
      const response = await fetch(`${SCRAPER_API_BASE_URL}/cookie`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ cookie }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Save cookie error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }

  async getCookie(): Promise<ScraperResponse> {
    try {
      const response = await fetch(`${SCRAPER_API_BASE_URL}/cookie`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Get cookie error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }

  async deleteCookie(): Promise<ScraperResponse> {
    try {
      const response = await fetch(`${SCRAPER_API_BASE_URL}/cookie`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Delete cookie error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }

  async startScraper(url: string, listName: string): Promise<ScraperResponse> {
    try {
      const response = await fetch(`${SCRAPER_API_BASE_URL}/start`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ url, listName }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Start scraper error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }

  async pauseScraper(): Promise<ScraperResponse> {
    try {
      const response = await fetch(`${SCRAPER_API_BASE_URL}/pause`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Pause scraper error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }
}

export const scraperService = new ScraperService();
