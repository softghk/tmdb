import axiosApi from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_URL
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

export const axios = axiosApi.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {Authorization: `Bearer ${TOKEN}`},
})
