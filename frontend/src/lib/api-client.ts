/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests automatically
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await apiClient.post("/auth/signup", userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },
};

// Simulation APIs - Updated to match your backend structure
export const simulationAPI = {
  runSimulation: async (formData: FormData) => {
    const response = await apiClient.post("/api/simulate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getHistory: async () => {
    const response = await apiClient.get("/api/history");
    return response.data;
  },

  getSimulation: async (id: string) => {
    const response = await apiClient.get(`/api/simulation/${id}`);
    return response.data;
  },

  rerunSimulation: async (id: string, question?: string) => {
    const response = await apiClient.post(`/api/rerun/${id}`, { question });
    return response.data;
  },

  downloadReport: async (id: string) => {
    const response = await apiClient.get(`/api/report/${id}`, {
      responseType: "blob", // This is crucial for file downloads
    });
    return response.data;
  },
};

// Helper function to transform backend data to frontend format
export const transformBackendToFrontend = (backendData: any) => {
  if (!backendData) {
    return {
      impact: { revenueDrop: 0, workloadIncrease: 0, trustDecline: 0 },
      report: "No data available",
      suggestion: "Please run the simulation again",
      details: {
        transactionsAnalyzed: 0,
        suspiciousCount: 0,
        riskLevel: "Unknown",
      },
    };
  }

  const result = backendData.result || backendData;

  console.log("🔍 Debug - Raw result for transformation:", result); // Debug log

  // ✅ FIX: Use the direct impact metrics from the result, NOT from perAgent
  // The backend already provides the final calculated metrics
  const revenueDrop = result.revenue_drop || 0;
  const workloadChange = result.workload_change || 0;
  const trustDrop = result.trust_drop || 0;

  // Get the main agent for report and suggestion
  const mainAgent = result.perAgent?.[0] || {};

  // Get question from multiple possible locations
  const question = backendData.question || result.question || "";

  // Determine risk level based on actual impact
  const maxImpact = Math.max(revenueDrop, workloadChange, trustDrop);
  const riskLevel =
    maxImpact > 10
      ? "Critical Zone"
      : maxImpact > 5
      ? "Caution Layer"
      : "Stable Zone";

  return {
    impact: {
      revenueDrop: revenueDrop,
      workloadIncrease: workloadChange,
      trustDecline: trustDrop,
    },
    report:
      result.human_readable ||
      mainAgent.narrative ||
      "Simulation analysis completed.",
    suggestion:
      mainAgent.recommendation ||
      "Review the detailed analysis for recommendations.",
    details: {
      transactionsAnalyzed: 1000,
      suspiciousCount: Math.max(1, Math.round(revenueDrop / 5)),
      riskLevel: riskLevel,
    },
    question: question,
  };
};

export default apiClient;
