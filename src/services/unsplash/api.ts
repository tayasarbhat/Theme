import { retry } from '../../utils/retry';
import { UNSPLASH_CONFIG } from './config';
import type { UnsplashResponse } from './types';

async function makeRequest(): Promise<UnsplashResponse> {
  const params = new URLSearchParams({
    client_id: UNSPLASH_CONFIG.API_KEY,
    orientation: UNSPLASH_CONFIG.DEFAULT_ORIENTATION,
    query: UNSPLASH_CONFIG.DEFAULT_QUERY,
  });

  const response = await fetch(
    `${UNSPLASH_CONFIG.BASE_URL}/photos/random?${params}`,
    {
      headers: {
        'Accept-Version': 'v1',
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data?.urls?.regular) {
    throw new Error('Invalid response format from Unsplash API');
  }

  return data;
}

export async function fetchRandomPhoto(): Promise<UnsplashResponse> {
  return retry(
    makeRequest,
    {
      maxAttempts: UNSPLASH_CONFIG.RETRIES,
      delayMs: UNSPLASH_CONFIG.RETRY_DELAY,
      onError: (error, attempt) => {
        console.warn(
          `Attempt ${attempt}/${UNSPLASH_CONFIG.RETRIES} failed:`,
          error.message
        );
      }
    }
  );
}