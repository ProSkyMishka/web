import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ProductCardProps } from "../components/products/ProductCard";

interface ProductsState {
  products: ProductCardProps[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<Omit<ProductCardProps, "id">>
    ) => {
      const newProduct = { ...action.payload, id: uuidv4() };
      state.products.push(newProduct);
    },
    editProduct: (state, action: PayloadAction<ProductCardProps>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
