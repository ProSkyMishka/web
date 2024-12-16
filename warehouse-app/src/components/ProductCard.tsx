import defaultImage from "../assets/image.png";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";

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
            {cat}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image={image || defaultImage}
          alt={title}
        />
        <CardContent>
          <Typography variant="body1">
            {count} {meas}
          </Typography>
        </CardContent>
      </Card>
    </Tooltip>
  );
};
