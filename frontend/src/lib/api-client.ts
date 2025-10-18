// API client for backend integration
// Replace mock data with actual API calls here

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: Implement actual API calls
export const simulateAnalysis = async (
  file: File,
  event: string,
  question: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("event", event);
  formData.append("question", question);

  // Uncomment when backend is ready
  // const response = await apiClient.post('/simulate', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // })
  // return response.data

  // For now, return mock data
  return {
    result: "Mock result",
    suggestion: "Mock suggestion",
  };
};

export default apiClient;
