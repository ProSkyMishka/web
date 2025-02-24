import { ProductCard, ProductCardProps } from "./ProductCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Box,
  Grid2,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Filters } from "../Sidebar";
import { ProductForm } from "./ProductForm";
import { removeProduct } from "../../slices/productsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";

export const ProductList = (filters: Filters) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<ProductCardProps[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  const dispatch = useAppDispatch();
  const products = useSelector((state: any) => state.products.products);

  useEffect(() => {
    let filtered = products;

    if (filters.name) {
      const nameRegex = new RegExp(filters.name, "i");
      filtered = filtered.filter((item: ProductCardProps) =>
        nameRegex.test(item.title)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (item: ProductCardProps) => item.category?._id === filters.category
      );
    }

    if (filters.inStock) {
      filtered = filtered.filter((item: ProductCardProps) => item.count > 0);
    }

    setFilteredItems(filtered);
  }, [filters, products]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleAddProductOpen = () => {
    setIsAddProductOpen(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductOpen(false);
  };

  return (
    <>
      <Grid2 container spacing={2} justifyContent="space-around">
        {currentProducts.map((item) => (
          <ProductCard
            key={item._id}
            _id={item._id}
            onClick={() => navigate(`/products/${item._id}`)}
            title={item.title}
            description={item.description}
            category={item.category}
            count={item.count}
            meas={item.meas}
            image={item.image}
            price={item.price}
            onDelete={() => handleDeleteProduct(item._id)}
          />
        ))}
      </Grid2>

      <Dialog open={isAddProductOpen} onClose={handleAddProductClose}>
        <DialogTitle>Добавить товар</DialogTitle>
        <DialogContent>
          <ProductForm onClose={handleAddProductClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProductClose} sx={{ color: "red" }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

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
          sx={{ color: "#333" }}
        />
      </Box>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#333" }}
        onClick={handleAddProductOpen}
      >
        Добавить товар
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#333" }}
        onClick={() => navigate("/categories")}
      >
        Управление категориями
      </Button>
    </>
  );
};
