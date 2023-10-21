const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE

// Get images for posters
export const getImage = (url: string) => {
  return `${IMAGE_URL}${url}`
}
