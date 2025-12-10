import { useLoading } from "../contexts/LoadingContext";

/**
 * Hook that throws a promise when loading, triggering Suspense fallback
 * This hook should be used in components that need to suspend during API calls
 */
export const useSuspenseLoader = () => {
  const { isLoading, promise } = useLoading();

  if (isLoading && promise) {
    // Throw the promise to trigger Suspense fallback
    throw promise;
  }

  return { isLoading };
};

