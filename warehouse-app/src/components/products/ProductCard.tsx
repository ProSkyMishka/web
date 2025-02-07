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
import { useAppSelector } from "../../store/store";

export interface ProductCardProps {
  id: string;
  title: string;
  desc?: string;
  cat?: string;
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
  desc,
  cat,
  count,
  meas,
  image,
  price,
  onDelete,
}: ProductCardProps & CardProps) => {
  const category = useAppSelector((state) =>
    state.categories.categories.find((p) => p.id === cat)
  );
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
            {category?.name || ""}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="110"
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
