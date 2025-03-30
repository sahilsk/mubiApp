
const baseUrl = "https://image.tmdb.org/t/p/w500";

export const constructMovieImageUrl = (path) => {
  return path ? `${baseUrl}/${path}` : "/no-poster.png";
}
