/**
 * Options for the retry mechanism
 */
interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  onError?: (error: Error, attempt: number) => void;
}

/**
 * Retries an async operation with exponential backoff
 */
export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (options.onError) {
        options.onError(lastError, attempt);
      }

      if (attempt === options.maxAttempts) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, options.delayMs * Math.pow(2, attempt - 1))
      );
    }
  }

  throw lastError!;
}