import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const useFetchData = <T>(url: string, lazy = false) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lazy) {
      const fetchData = async () => {
        try {
          const { data: responseData } = await axios.get<T>(url);

          setData(responseData);
        } catch (err: AxiosError | unknown) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('Something went wrong!');
          }
        } finally {
          setLoading(false);
        }
      };

      // eslint-disable-next-line no-void
      void fetchData();
    }
  }, [lazy]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
