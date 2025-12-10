import React from "react";
import { useLoading } from "../contexts/LoadingContext";

/**
 * Component that suspends when API calls are in progress
 * Wrap your components with this to enable Suspense for axios calls
 * This component throws a promise when loading, which triggers Suspense fallback
 */
const SuspenseWrapper = ({ children }) => {
  const { isLoading, promise } = useLoading();

  // Throw promise to trigger Suspense fallback when loading
  if (isLoading && promise) {
    throw promise;
  }

  return <>{children}</>;
};

export default SuspenseWrapper;
