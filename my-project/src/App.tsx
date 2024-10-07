import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <>
      <Header title="My Shop" />
      <ProductList />
      <Footer title="We glad to see you!" />
    </>
  );
}

export default App;
