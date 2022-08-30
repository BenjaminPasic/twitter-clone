import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(url, method, headers = null) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [axiosError, setAxiosError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      data: postData,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (options) => {
      setAxiosError(null);
      setIsPending(true);
      try {
        const res = await axios({
          ...options,
          url,
          signal: controller.signal,
        });
        setData(res.data);
        setIsPending(false);
      } catch (error) {
        setAxiosError(error.response.data.error);
        setIsPending(false);
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return { data, isPending, axiosError, postData };
}
