

export const getImageUrl = (size: number, path: string): string =>
  `https://image.tmdb.org/t/p/w${size}${path}`;
