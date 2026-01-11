import { createContext, useContext, useReducer } from "react";

// Initial global state
const initialState = {
  city: "none",
  theme: "light",
  isLoading: false,

  colors: {
    primary: "#9c0101",
    secondary: "#e5383b",
  },
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };

    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    case "SET_PRIMARY_COLOR":
      return {
        ...state,
        colors: {
          ...state.colors,
          primary: action.payload,
        },
      };

    case "SET_SECONDARY_COLOR":
      return {
        ...state,
        colors: {
          ...state.colors,
          secondary: action.payload,
        },
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

// Create context
const AppContext = createContext(null);

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
