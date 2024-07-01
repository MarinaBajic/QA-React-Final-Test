import { useState, useCallback } from 'react';

export function useFetch<T>() {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchProducts = useCallback(async (url: string) => {
		setLoading(true);
		setError(null);
		setData(null);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const data: T = await response.json();
			setData(data);
		} catch (ex: any) {
			setError(ex);
		} finally {
			setLoading(false);
		}
	}, []);

	return { fetch: fetchProducts, data, loading, error };
};
