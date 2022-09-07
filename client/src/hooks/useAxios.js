import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(urlRoute, method) {
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
          url: "http://localhost:3001" + urlRoute,
          signal: controller.signal,
          headers: { auth: localStorage.getItem("token") },
        });
        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
        }
        setData(res.data);
        setIsPending(false);
      } catch (error) {
        console.log(error);
        setAxiosError(error?.response.data.error);
        if (error?.response?.data?.error === "Invalid token") {
          window.location.href = "/login";
        }
        setIsPending(false);
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    // return () => {
    //   controller.abort();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return { data, isPending, axiosError, postData };
}
