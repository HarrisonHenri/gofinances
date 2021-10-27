import axios from 'axios'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWQ2NTc5ZTMtODRkZS00MzRmLTk0MGEtYzUyMTQ1NDcwZDQxIiwibmFtZSI6IkhhcnJpc29uIiwiZW1haWwiOiJoYXJyaXNvbmhlbnJpc25AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkNjlZN3VqWFF5OGtEMS85Q1QyZXB1dUNpZ0JoeTBJRHhSR2VJeW1IeGZmdkdtV1R1Qy5wVzIiLCJjcmVhdGVkX2F0IjoiMjAyMS0xMC0yNlQwMDoxMTo1Mi45MDhaIiwidXBkYXRlZF9hdCI6IjIwMjEtMTAtMjZUMDA6MTE6NTIuOTA4WiJ9LCJpYXQiOjE2MzUyMDcxMTYsImV4cCI6MTYzNTI5MzUxNiwic3ViIjoiYWQ2NTc5ZTMtODRkZS00MzRmLTk0MGEtYzUyMTQ1NDcwZDQxIn0.KMzt_RYBk6c6seOCo7ejNiqW-95bEQaJEOW4q1y7rGE'

const api = axios.create({
  baseURL: 'http://192.168.1.76:3333',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export { api }
