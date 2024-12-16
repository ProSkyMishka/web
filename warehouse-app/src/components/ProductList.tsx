import { ProductCard, ProductCardProps } from "./ProductCard";
import { useEffect, useState } from "react";
import { ModalProduct } from "./ModalProduct";
import productsData from "../assets/products.json";
import { Pagination, Box, Grid2 } from "@mui/material";
import { Filters } from "./Sidebar";

export const ProductList = (filters: Filters) => {
  const [items, setProducts] = useState<ProductCardProps[]>([]);
  const [item, setSelectedProduct] = useState<null | (typeof items)[0]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<ProductCardProps[]>([]);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    // Загружаем тестовые данные
    setProducts(productsData);
    setFilteredItems(productsData);
  }, []);

  useEffect(() => {
    let filtered = items;

    if (filters.name) {
      const nameRegex = new RegExp(filters.name, "i");
      filtered = filtered.filter((item) => nameRegex.test(item.title));
    }

    if (filters.category) {
      filtered = filtered.filter((item) => item.cat == filters.category);
    }

    if (filters.inStock) {
      filtered = filtered.filter((item) => item.count > 0);
    }

    setFilteredItems(filtered);
  }, [filters, items]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = filteredItems.slice(startIndex, endIndex);

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
