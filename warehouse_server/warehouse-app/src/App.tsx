import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryList } from "./components/categories/CategoryList";
import { NavigationPanel } from "./components/NavigationPanel";
import { Filters, Sidebar } from "./components/Sidebar";
import { useEffect, useState } from "react";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import UserProfile from "./components/UserProfile";
import { fetchProducts } from "./slices/productsSlice";
import { fetchCategories } from "./slices/categoriesSlice";
import { useAppDispatch } from "./store/store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    inStock: false,
  });

  const sidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <NavigationPanel onClick={sidebarToggle} />
      {isSidebarOpen && (
        <Sidebar
          getFilters={filters}
          onApplyFilters={applyFilters}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="products"
          element={
            <ProductsPage
              name={filters.name}
              category={filters.category}
              inStock={filters.inStock}
            />
          }
        />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
