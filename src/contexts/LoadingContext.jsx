import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { loadingManager } from "../utils/loadingManager";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const promiseRef = useRef(null);
  const resolveRef = useRef(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    // Subscribe to loading manager updates
    const unsubscribe = loadingManager.subscribe((loading) => {
      const wasLoading = isLoadingRef.current;
      isLoadingRef.current = loading;
      setIsLoading(loading);

      if (loading && !wasLoading) {
        // Start loading - create a new promise
        const loadingPromise = new Promise((resolve) => {
          resolveRef.current = resolve;
        });
        promiseRef.current = loadingPromise;
      } else if (!loading && wasLoading && resolveRef.current) {
        // Stop loading - resolve the promise
        resolveRef.current();
        resolveRef.current = null;
        // Clear promise after a tick to allow Suspense to re-render
        setTimeout(() => {
          promiseRef.current = null;
        }, 0);
      }
    });

    // Initialize loading state
    const initialLoading = loadingManager.isLoading();
    isLoadingRef.current = initialLoading;
    setIsLoading(initialLoading);

    return unsubscribe;
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, promise: promiseRef.current }}>
      {children}
    </LoadingContext.Provider>
  );
};
