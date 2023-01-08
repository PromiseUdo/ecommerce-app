import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
  
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);
  // console.log("data", data);
  return { data, loading, error };
};

export default useFetch;
