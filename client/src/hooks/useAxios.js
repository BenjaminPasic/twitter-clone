import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(url, method, body = null, headers = null) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsPending(true);
      try {
        const res = await axios({
          method,
          url,
          ...(body && { body: body }),
          signal: controller.signal,
        });
        setData(res.data);
        setIsPending(false);
      } catch (error) {
        setError("Error in fetching data...");
        console.log("useAxios hook error: ", error);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isPending, error };
}
