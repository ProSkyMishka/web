import React, { useEffect, useState } from "react";
import { Button, TextField, Box, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../slices/productsSlice";
import { Category } from "../../slices/categoriesSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";

interface ProductFormProps {
  onClose: () => void;
  id?: string;
}

export const ProductForm = (formProps: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [count, setCount] = useState(0);
  const [meas, setMeas] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("0");

  const product = useAppSelector((state) =>
    state.products.products.find((p) => p._id === formProps.id)
  );

  useEffect(() => {
    if (formProps.id) {
      if (!product) {
        formProps.onClose();
        return;
      }

      setTitle(product.title);
      setDesc(product.description || "");
      setCategory(product.category || undefined);
      setCount(product.count);
      setMeas(product.meas);
      setImage(product.image || "");
      setPrice(product.price);
    }
  }, [formProps.id, product]);

  const categories = useSelector((state: any) => state.categories.categories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !count || !price) {
      alert("Все поля обязательны для заполнения!");
      return;
    }

    const productData = {
      title,
      description,
      category,
      count,
      meas,
      image,
      price,
    };

    if (formProps.id) {
      dispatch(updateProduct({ ...productData, _id: formProps.id }));
    } else {
      dispatch(createProduct(productData));
    }
    formProps.onClose();
  };
  return (
    <Box>
      <h2>Добавить товар</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название товара"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label="Категория"
          value={category?._id || ""}
          onChange={(e) => {
            const selectedCategory = categories.find(
              (cat: Category) => cat._id === e.target.value
            );
            setCategory(selectedCategory || null);
          }}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">Без категории</MenuItem>
          {categories.map((cat: Category) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Количество"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          fullWidth
          required
        />
        <TextField
          label="Единица измерения"
          value={meas}
          onChange={(e) => setMeas(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Цена $"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          type="number"
        />
        <TextField
          label="Изображение"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
        />
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#333" }}
          >
            Сохранить
          </Button>
        </Box>
      </form>
    </Box>
  );
};
