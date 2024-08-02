import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET", // Use default value if method is not provided
        headers: requestConfig.headers || {}, // Use default value if headers are not provided
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        // Checking if response is not okay
        throw new Error("Request Failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
    setIsSubmitted(true);
  }, []);

  return {
    isLoading,
    error,
    isSubmitted,
    sendRequest,
  };
};

export default useHttp;
