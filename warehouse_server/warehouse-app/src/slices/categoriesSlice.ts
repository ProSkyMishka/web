import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Category {
  _id: string;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:5005/api/categories";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка при получении категорий");
    }
    return (await response.json()) as Category[];
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: Omit<Category, "_id">) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    if (!response.ok) {
      throw new Error("Ошибка при создании категории");
    }
    return (await response.json()) as Category;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    const response = await fetch(`${API_URL}/${category._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Ошибка при обновлении категории");
    }
    return (await response.json()) as Category;
  }
);

export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Ошибка при удалении категории");
    }
    return id;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Ошибка";
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index = state.categories.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });
    builder.addCase(removeCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    });
  },
});

export default categoriesSlice.reducer;
