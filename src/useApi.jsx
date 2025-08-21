import { useEffect, useState } from "react";
import axios from "axios";

export default function useApi(url, dataPath = "data") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        // Acceder a los datos de forma dinámica según el path proporcionado
        const dataValue = dataPath
          .split(".")
          .reduce((obj, key) => obj && obj[key], res.data);
        setData(dataValue || []);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [url, dataPath]);

  return { data, loading, error };
}
