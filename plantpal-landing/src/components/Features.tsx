import defaultImage from "../assets/image.png";

export interface ProductCardProps {
  title: string;
  desc?: string;
  cat?: string;
  count: number;
  meas: string;
  image?: string;
}

export interface CardProps {
  onClick: () => void;
}

export const ProductCard = ({
  onClick,
  title,
  desc,
  cat,
  count,
  meas,
  image,
}: ProductCardProps & CardProps) => {
  return (
    <div className="productCard" onClick={onClick}>
      <h2>{title}</h2>
      {image ? (
        <img src={image} className="productCardImage" />
      ) : (
        <img src={defaultImage} className="productCardImage" />
      )}
      {desc && <p className="productCardDesc">{desc}</p>}
      {cat && <p>Category: {cat}</p>}
      <p>
        {count} {meas}
      </p>
    </div>
  );
};
