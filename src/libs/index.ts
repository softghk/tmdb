import axiosApi from 'axios'

// Get urls and token from env file
const BASE_URL = process.env.NEXT_PUBLIC_URL
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

// Initial the axios for fetching apis
export const axios = axiosApi.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {Authorization: `Bearer ${TOKEN}`},
})
