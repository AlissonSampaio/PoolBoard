import axios from "axios";
import { useState, useEffect } from "react";

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(url);
      setData(data);
      
      setIsFetching(false);

      return {data, isFetching};
    }

    getData();
  }, [])
}