import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductCardProps } from "../components/products/ProductCard";

interface ProductsState {
  products: ProductCardProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:5005/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка при получении товаров");
    }
    const data = await response.json();
    console.log("Response data:", data);

    if (!Array.isArray(data)) {
      throw new Error("Ответ сервера не является массивом товаров");
    }

    return data as ProductCardProps[];
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: Omit<ProductCardProps, "_id">) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newProduct.title,
        description: newProduct.description,
        category: newProduct.category?._id,
        count: newProduct.count,
        meas: newProduct.meas,
        image: newProduct.image || "",
        price: newProduct.price,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при создании товара");
    }
    return (await response.json()) as ProductCardProps;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: ProductCardProps) => {
    const response = await fetch(`${API_URL}/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Ошибка при обновлении товара");
    }
    return (await response.json()) as ProductCardProps;
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Ошибка при удалении товара");
    }
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
      console.log("Fetching products...");
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
      console.log("Products fetched successfully:", action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Ошибка";
      console.log("Error fetching products:", action.error.message);
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      console.log("Product created:", action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      console.log("Product updated:", action.payload);
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
      console.log("Product removed:", action.payload);
    });
  },
});

export default productsSlice.reducer;
