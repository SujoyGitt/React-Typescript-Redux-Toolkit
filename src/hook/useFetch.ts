import { useEffect, useState } from "react";

const useFetch = <T>(apiData: string) => {
  const [data, setData] = useState<T | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(apiData);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoad(false);
      }
    };

    fetchData();
    return () => controller.abort(); // cleanup
  }, [apiData]);

  return { data, load, error };
};

export default useFetch;
