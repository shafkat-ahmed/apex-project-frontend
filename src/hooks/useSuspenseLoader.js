import { useLoading } from "../contexts/LoadingContext";

export const useSuspenseLoader = () => {
  const { isLoading, promise } = useLoading();

  if (isLoading && promise) {
    throw promise;
  }

  return { isLoading };
};
