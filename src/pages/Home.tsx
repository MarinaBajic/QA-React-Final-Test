import { useEffect, useState } from 'react';
import { useFetch } from '../utils/useFetch';
import ProductThumbnail from '../components/ProductThumbnail';
import { Product } from '../types/Product';
import { ApiResponse } from '../types/ApiResponse';

function Home() {
	const { fetch, data, loading, error } = useFetch<ApiResponse>();
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const getAllUrl = `https://dummyjson.com/products?limit=12&skip=${
		(currentPage - 1) * 12
	}`;

	useEffect(() => {
		fetch(getAllUrl);
	}, [fetch, currentPage]);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (searchQuery.trim() == '') {
			fetch(getAllUrl);
		} else {
			const searchUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(
				searchQuery,
			)}`;

			fetch(searchUrl);
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<main className="py-12">
			{loading && <span>Loading...</span>}
			{!loading && error && <span>ERROR:${error.message}</span>}
			{!loading && data?.products && (
				<section>
					<form onSubmit={handleSearch}>
						<input
							className="border-1 rounded-md p-2 mr-4"
							type="search"
							value={searchQuery}
							name="search-form"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products"
						/>
						<button type="submit">Search</button>
					</form>
					<section className="grid grid-cols-4 gap-4 py-12">
						{data.products.map((product: Product) => (
							<ProductThumbnail
								key={product.id}
								product={product}
							/>
						))}
					</section>
					<div className="flex gap-3 justify-center">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Previous
						</button>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={data.products.length < data.limit}
						>
							Next
						</button>
					</div>
				</section>
			)}
		</main>
	);
}

export default Home;
