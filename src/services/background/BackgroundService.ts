import { UNSPLASH_CONFIG } from '../unsplash/config';
import type { BackgroundState } from '../unsplash/types';
import { fetchRandomPhoto } from '../unsplash/api';
import { FALLBACK_WALLPAPERS } from './fallbackWallpapers';

class BackgroundService {
  private static instance: BackgroundService;
  private currentState: BackgroundState;
  private intervalId?: number;
  private retryCount: number = 0;
  private readonly maxRetries: number = 3;
  private usedFallbackIndices: Set<number> = new Set();

  private constructor() {
    this.currentState = {
      url: null,
      error: null,
      isLoading: false
    };
  }

  public static getInstance(): BackgroundService {
    if (!BackgroundService.instance) {
      BackgroundService.instance = new BackgroundService();
    }
    return BackgroundService.instance;
  }

  private getRandomFallbackWallpaper(): string {
    // Reset used indices if all wallpapers have been used
    if (this.usedFallbackIndices.size === FALLBACK_WALLPAPERS.length) {
      this.usedFallbackIndices.clear();
    }

    // Get available indices
    const availableIndices = Array.from(
      { length: FALLBACK_WALLPAPERS.length },
      (_, i) => i
    ).filter(i => !this.usedFallbackIndices.has(i));

    // Select random available index
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this.usedFallbackIndices.add(randomIndex);

    return FALLBACK_WALLPAPERS[randomIndex].url;
  }

  private setFallbackBackground(): void {
    const wallpaperUrl = this.getRandomFallbackWallpaper();
    this.applyBackground(`url(${wallpaperUrl})`);
  }

  private applyBackground(source: string): void {
    document.body.style.backgroundImage = source;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.transition = 'background-image 0.5s ease-in-out';
  }

  private async preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });
  }

  private async fetchAndApplyBackground(): Promise<void> {
    try {
      this.currentState = { ...this.currentState, isLoading: true, error: null };
      
      const data = await fetchRandomPhoto();
      await this.preloadImage(data.urls.regular);
      
      this.applyBackground(`url(${data.urls.regular})`);
      this.currentState = {
        url: data.urls.regular,
        error: null,
        isLoading: false
      };
      
      this.retryCount = 0;
    } catch (error) {
      this.retryCount++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Background fetch attempt ${this.retryCount} failed:`, errorMessage);

      if (this.retryCount >= this.maxRetries) {
        console.info('Using fallback wallpaper');
        this.setFallbackBackground();
        this.currentState = {
          url: null,
          error: null, // Don't show error to user when fallback is used
          isLoading: false
        };
      } else {
        // Retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, this.retryCount - 1), 10000);
        setTimeout(() => this.fetchAndApplyBackground(), delay);
      }
    }
  }

  public start(): void {
    this.setFallbackBackground(); // Set initial fallback
    this.fetchAndApplyBackground(); // Initial fetch

    // Clear any existing interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Set up new interval
    this.intervalId = window.setInterval(
      () => this.fetchAndApplyBackground(),
      UNSPLASH_CONFIG.REFRESH_INTERVAL
    );
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    document.body.style.backgroundImage = '';
  }

  public getState(): BackgroundState {
    return { ...this.currentState };
  }
}

export const backgroundService = BackgroundService.getInstance();