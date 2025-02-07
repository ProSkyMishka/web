import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { deleteProduct } from "../../slices/productsSlice";
import defaultImage from "../../assets/image.png";
import { useState } from "react";
import { ProductForm } from "./ProductForm";

interface ProductDetailsProps {
  id?: string;
}

export const ProductDetails = ({ id }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);

  const handleEditProductOpen = () => {
    setIsEditProductOpen(true);
  };

  const handleEditProductClose = () => {
    setIsEditProductOpen(false);
  };

  if (!product) return <Typography>Товар не найден</Typography>;

  const category = useAppSelector((state) =>
    state.categories.categories.find((p) => p.id === product.cat)
  );

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
    navigate("/products");
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box
            component="img"
            src={product.image || defaultImage}
            alt={product.title}
            sx={{
              width: "60%",
              height: "auto",
              marginBottom: 2,
            }}
          />
          <Typography variant="h4">{product.title}</Typography>
          <Typography>{product.desc}</Typography>
          <Typography>Категория: {category?.name || ""}</Typography>
          <Typography>
            Количество: {product.count} {product.meas}
          </Typography>
          <Typography>Цена: {product.price}$</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#333" }}
            onClick={handleEditProductOpen}
          >
            Редактировать товар
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={handleDelete}
          >
            Удалить товар
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isEditProductOpen} onClose={handleEditProductClose}>
        <DialogTitle>Изменить товар</DialogTitle>
        <DialogContent>
          <ProductForm onClose={handleEditProductClose} id={product.id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProductClose} sx={{ color: "red" }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
