const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE

export const getImage = (url: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${url}`
}
