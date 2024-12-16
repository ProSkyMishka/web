import { ProductCard, ProductCardProps } from "./ProductCard";
import { useEffect, useState } from "react";
import { ModalProduct } from "./ModalProduct";
import productsData from "../assets/products.json";
import { Pagination, Box, Grid2 } from "@mui/material";

export const ProductList = () => {
  const [items, setProducts] = useState<ProductCardProps[]>([]);
  const [item, setSelectedProduct] = useState<null | (typeof items)[0]>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    // Загружаем тестовые данные
    setProducts(productsData);
  }, []);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = items.slice(startIndex, endIndex);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const openModal = (product: (typeof items)[0]) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <>
      <Grid2 container spacing={2} justifyContent="space-around">
        {currentProducts.map((item, id) => (
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
      </Grid2>

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};
