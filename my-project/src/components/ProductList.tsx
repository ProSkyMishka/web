export interface Product {
  id: number;
  name: string;
  price: number;
}

const items: Product[] = [
  {
    id: 0,
    name: "kasha",
    price: 500,
  },
  {
    id: 1,
    name: "kasha1",
    price: 501,
  },
  {
    id: 2,
    name: "kash2",
    price: 502,
  },
];
export const ProductList = () => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.name} - {item.price}руб
        </div>
      ))}
    </div>
  );
};
