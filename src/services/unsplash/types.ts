export interface UnsplashResponse {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

export interface BackgroundState {
  url: string | null;
  error: string | null;
  isLoading: boolean;
}