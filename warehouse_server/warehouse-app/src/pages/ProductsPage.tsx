import { ProductList } from "../components/products/ProductList";
import { Filters } from "../components/Sidebar";

export const ProductsPage = (filters: Filters) => {
  return (
    <ProductList
      name={filters.name}
      category={filters.category}
      inStock={filters.inStock}
    />
  );
};
