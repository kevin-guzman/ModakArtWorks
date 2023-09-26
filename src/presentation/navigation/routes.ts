export enum routes {
  Favorites = "Favorites",
  ArtWorksList = "ArtWorks",
  ArtWorkDetails = "ArtWorkDetails"
}

export const routesTitles:Record<routes, string> = {
  [routes.Favorites]: "___Favorites___",
  [routes.ArtWorksList]: "___Gallery___",
  [routes.ArtWorkDetails]: "___Details___"
};