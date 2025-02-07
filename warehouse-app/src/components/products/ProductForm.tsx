import React, { useEffect, useState } from "react";
import { Button, TextField, Box, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../../slices/productsSlice";
import { Category } from "../../slices/categoriesSlice";
import { useAppSelector } from "../../store/store";

interface ProductFormProps {
  onClose: () => void;
  id?: string;
}

export const ProductForm = (formProps: ProductFormProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [count, setCount] = useState(0);
  const [meas, setMeas] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("0");

  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === formProps.id)
  );

  useEffect(() => {
    if (formProps.id) {
      if (!product) {
        formProps.onClose();
        return;
      }

      setTitle(product.title);
      setDesc(product.desc || "");
      setCat(product.cat || "");
      setCount(product.count);
      setMeas(product.meas);
      setImage(product.image || "");
      setPrice(product.price);
    }
  }, [formProps.id, product]);
  const categories = useSelector((state: any) => state.categories.categories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !desc || !count || !price) {
      alert("Все поля обязательны для заполнения!");
      return;
    }

    if (formProps.id) {
      dispatch(
        editProduct({
          id: formProps.id,
          title: title,
          desc: desc,
          cat: cat,
          count: count,
          meas: meas,
          image: image,
          price: price,
        })
      );
    } else {
      dispatch(
        addProduct({
          title,
          desc,
          cat,
          count,
          meas,
          price,
          image,
        })
      );
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
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label="Категория"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">Without category</MenuItem>
          {categories.map((cat: Category) => (
            <MenuItem value={cat.id}>{cat.name}</MenuItem>
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
