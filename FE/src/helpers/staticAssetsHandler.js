// eslint-disable-next-line import/prefer-default-export
export function getAsset(pathFromAssetsFolder) {
  return new URL(`../assets/${pathFromAssetsFolder}`, import.meta.url).href;
}
