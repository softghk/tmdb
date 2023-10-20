const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE

export const getImage = (url: string) => {
  return `${IMAGE_URL}${url}`
}
