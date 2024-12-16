import "./App.css";
import { ProductList } from "./components/ProductList";
import { NavigationPanel } from "./components/NavigationPanel";
import { useState } from "react";
import { Filters, Sidebar } from "./components/Sidebar";
import { Backdrop } from "@mui/material";

function App() {
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
    <>
      <NavigationPanel onClick={sidebarToggle} />
      {isSidebarOpen && (
        <>
          <Backdrop
            open={isSidebarOpen}
            onClick={sidebarToggle}
            sx={{
              color: "#fff",
              zIndex: 1,
            }}
          />{" "}
          <Sidebar
            getFilters={filters}
            onApplyFilters={applyFilters}
            onClose={sidebarToggle}
          />
        </>
      )}
      <ProductList
        name={filters.name}
        category={filters.category}
        inStock={filters.inStock}
      />
    </>
  );
}

export default App;
