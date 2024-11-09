import { ProductCard, ProductCardProps } from "./ProductCard";
import { useEffect, useState } from "react";
import { ModalProduct } from "./ModalProduct";
import productsData from "../assets/products.json";

export const ProductList = () => {
  const [items, setProducts] = useState<ProductCardProps[]>([]);
  const [item, setSelectedProduct] = useState<null | (typeof items)[0]>(null);

  useEffect(() => {
    // Загружаем тестовые данные
    setProducts(productsData);
  }, []);

  const openModal = (product: (typeof items)[0]) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div className="productList">
      {items.map((item, id) => (
        <ProductCard
          key={id}
          onClick={() => openModal(item)}
          title={item.title}
          desc={item.desc}
          cat={item.cat}
          count={item.count}
          meas={item.meas}
          image={item.image}
        />
      ))}
      {item && (
        <ModalProduct
          title={item.title}
          desc={item.desc}
          cat={item.cat}
          count={item.count}
          meas={item.meas}
          image={item.image}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
