import { useState, useEffect } from 'react';
import { backgroundService } from '../services/background/BackgroundService';
import type { BackgroundState } from '../services/unsplash/types';

export function useUnsplashBackground(): BackgroundState {
  const [state, setState] = useState<BackgroundState>(backgroundService.getState());

  useEffect(() => {
    // Start the background service
    backgroundService.start();

    // Set up an interval to check the service state
    const checkInterval = setInterval(() => {
      setState(backgroundService.getState());
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(checkInterval);
      backgroundService.stop();
    };
  }, []);

  return state;
}