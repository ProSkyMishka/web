import { useParams } from "react-router-dom";
import { ProductDetails } from "../components/products/ProductDetails";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  return <ProductDetails id={id} />;
};
