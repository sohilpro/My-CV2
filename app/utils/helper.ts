export const assetUrl = (path: string, baseURL: string) => {
  return `${baseURL}${path.replace(/^\/+/, '')}`
}