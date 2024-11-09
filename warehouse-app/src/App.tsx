import "./App.css";
import { ProductList } from "./components/ProductList";
import { NavigationPanel } from "./components/NavigationPanel";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationPanel onClick={sidebarToggle} />
      {isSidebarOpen && <Sidebar />}
      <ProductList />
    </div>
  );
}

export default App;
