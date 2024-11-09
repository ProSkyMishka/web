import { ProductCardProps } from "./ProductCard";
import defaultImage from "../assets/image.png";

export interface ModalProps {
  onClose: () => void;
}

export const ModalProduct = ({
  onClose,
  title,
  desc,
  cat,
  count,
  meas,
  image,
}: ProductCardProps & ModalProps) => {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>
          ×
        </button>
        <h2>{title}</h2>
        {image ? (
          <img src={image} className="productCardImage" />
        ) : (
          <img src={defaultImage} className="productCardImage" />
        )}
        {desc && <p>{desc}</p>}
        {cat && <p>Category: {cat}</p>}
        <p>
          {count} {meas}
        </p>
      </div>
    </div>
  );
};
