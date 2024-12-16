import "./App.css";
import { ProductList } from "./components/ProductList";
import { NavigationPanel } from "./components/NavigationPanel";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Backdrop } from "@mui/material";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
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
          <Sidebar onClose={sidebarToggle} />
        </>
      )}
      <ProductList />
    </div>
  );
}

export default App;
