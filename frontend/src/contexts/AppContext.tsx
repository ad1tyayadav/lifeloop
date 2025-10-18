/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_SIMULATION'; payload: Simulation }
  | { type: 'SET_HISTORY'; payload: Simulation[] };

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
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_SIMULATION':
      return {
        ...state,
        currentSimulation: action.payload,
        history: [action.payload, ...state.history]
      };
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}