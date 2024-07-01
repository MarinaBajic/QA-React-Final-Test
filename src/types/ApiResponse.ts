import { Product } from "./Product";

export type ApiResponse = {
	limit: number;
	products: Array<Product>;
	skip: number;
	total: number;
};