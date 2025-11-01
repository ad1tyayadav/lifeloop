/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
  useEffect
} from "react";
import { authAPI, simulationAPI, transformBackendToFrontend } from "@/lib/api-client";

interface User {
  id: string;
  email: string;
  name: string;
}

interface Simulation {
  id: string;
  date: string;
  eventType: string;
  question: string;
  fileName: string;
  result: any;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentSimulation: Simulation | null;
  history: Simulation[];
  isLoading: boolean;
}

type AppAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_SIMULATION"; payload: Simulation }
  | { type: "SET_HISTORY"; payload: Simulation[] };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  currentSimulation: null,
  history: [],
  isLoading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  runSimulation: (formData: FormData) => Promise<any>;
  getHistory: () => Promise<void>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...initialState };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_SIMULATION":
      return {
        ...state,
        currentSimulation: action.payload,
        history: [action.payload, ...state.history],
      };
    case "SET_HISTORY":
      return { ...state, history: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [initialized, setInitialized] = useState(false);

  // 🧠 Restore session on page load
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setInitialized(true);
        return;
      }

      try {
        const decoded: any = JSON.parse(atob(token.split(".")[1]));
        const user = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name || "",
        };
        dispatch({ type: "LOGIN", payload: user });
      } catch (err) {
        console.error("Failed to restore session:", err);
        localStorage.removeItem("authToken");
      } finally {
        setInitialized(true);
      }
    };

    restoreSession();
  }, []);

  // 🧩 Auth functions
  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { user, token } = await authAPI.login({ email, password });
      localStorage.setItem("authToken", token);
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { user, token } = await authAPI.signup({ name, email, password });
      localStorage.setItem("authToken", token);
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });
  };

  // Add this function to your existing AppContext
  const runSimulation = async (formData: FormData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const result = await simulationAPI.runSimulation(formData);

      // ✅ FIX: Properly extract question from formData
      const question = formData.get("question") as string;

      const simulation: Simulation = {
        id: result.id.toString(),
        date: new Date().toISOString(),
        eventType: formData.get("event_type") as string,
        question: question || "No specific question provided", // Use actual question
        fileName: (formData.get("title") as string) || "Untitled",
        result: transformBackendToFrontend(result),
      };

      dispatch({ type: "ADD_SIMULATION", payload: simulation });
      return result;
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const getHistory = async () => {
    try {
      const historyData = await simulationAPI.getHistory();
      console.log('Raw history data from backend:', historyData); // Debug log

      const simulations: Simulation[] = historyData.map((item: any) => {
        // ✅ FIX: Check multiple possible locations for question
        const question = item.question ||
          (item.result_json && item.result_json.question) ||
          "No specific question provided";

        return {
          id: item.id.toString(),
          date: item.created_at || new Date().toISOString(),
          eventType: item.event_type,
          question: question,
          fileName: item.title || "Untitled",
          result: transformBackendToFrontend(item.result_json || item),
        };
      });


      dispatch({ type: "SET_HISTORY", payload: simulations });
    } catch (error) {
      console.error("Failed to fetch history:", error);
      throw error;
    }
  };
  // 🧭 Don’t render children until session restore finishes
  if (!initialized) {
    return (
      <div className="min-h-screen mint-gradient-bg flex items-center justify-center">
        <p className="text-gray-600">Restoring session...</p>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        login,
        signup,
        logout,
        runSimulation,
        getHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}