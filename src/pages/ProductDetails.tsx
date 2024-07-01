import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { useFetch } from '../utils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ProductDetails() {
	const { id } = useParams();
	const { fetch, data, loading, error } = useFetch<Product>();

	useEffect(() => {
		fetch(`https://dummyjson.com/products/${id}`);
	}, [fetch, id]);

	return (
		<main className="py-12">
			{loading && <span>Loading...</span>}
			{!loading && error && <span>ERROR:${error.message}</span>}
			{!loading && data && (
				<>
					<Link to="/">
						<button>
							<FontAwesomeIcon icon={faArrowLeft} />
						</button>
					</Link>
					<section className="flex flex-col gap-6 items-center mt-14">
						<h1 className="text-5xl">{data.title}</h1>
						<span className="text-lg italic">
							-- {data.brand} --
						</span>
						<div className="w-fit grid grid-cols-2 justify-items-center mx-auto">
							{data.images.map((image) => (
								<img
									key={image}
									src={image}
									className="w-56"
									alt=""
									loading="lazy"
								/>
							))}
						</div>
						<p className="w-96 text-center">{data.description}</p>
						<span className="text-3xl font-bold">
							$ {data.price}
						</span>
						<span className="text-xl">Rating: {data.rating}</span>
					</section>
				</>
			)}
		</main>
	);
}

export default ProductDetails;
