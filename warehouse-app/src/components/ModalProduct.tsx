import { ProductCardProps } from "./ProductCard";
import defaultImage from "../assets/image.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

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
    <Dialog
      open={true}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "600px",
          maxHeight: "500px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={image || defaultImage}
          alt={title}
          sx={{
            width: "60%",
            height: "auto",
            marginBottom: 2,
          }}
        />
        <Typography>Category: {cat}</Typography>
        <Typography>
          Count: {count} {meas}
        </Typography>
        <Typography>Description: {desc}</Typography>
      </DialogContent>
    </Dialog>
  );
};
