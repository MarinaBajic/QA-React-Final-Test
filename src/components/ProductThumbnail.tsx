import { Link } from "react-router-dom";
import { Product } from "../types/Product";

type ProductThumbnailProps = {
	product: Product
};

function ProductThumbnail({ product }: ProductThumbnailProps) {
	return (
		<div className="card border-2 rounded-md p-6">
			<Link to={`/product/${product.id}`}>
				<span>{product.title}</span>
				<img src={product.thumbnail} alt=""  loading="lazy"/>
				<span>{product.price}</span>
			</Link>
		</div>
	);
}

export default ProductThumbnail;
