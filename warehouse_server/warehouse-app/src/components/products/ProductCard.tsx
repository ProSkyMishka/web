import defaultImage from "../../assets/image.png";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Category } from "../../slices/categoriesSlice";

export interface ProductCardProps {
  _id: string;
  title: string;
  description?: string;
  category?: Category;
  count: number;
  meas: string;
  image?: string;
  price: string;
  onDelete?: () => void;
}

export interface CardProps {
  onClick: () => void;
}

export const ProductCard = ({
  onClick,
  title,
  description: desc,
  category: cat,
  count,
  meas,
  image,
  price,
  onDelete,
}: ProductCardProps & CardProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };
  return (
    <Tooltip
      title={
        <Box
          sx={{
            maxWidth: 300,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {desc || "None"}
        </Box>
      }
      arrow
    >
      <Card
        onClick={onClick}
        sx={{
          width: 300,
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <CardContent sx={{ textAlign: "center", paddingBottom: 0 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cat?.name || ""}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            height: "110px",
            width: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            objectFit: "contain",
          }}
          image={image || defaultImage}
          alt={title}
        />

        <CardContent>
          <Typography variant="body1">
            {count} {meas}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1">{price}$</Typography>
        </CardContent>
        <IconButton sx={{ color: "red" }} onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Card>
    </Tooltip>
  );
};
