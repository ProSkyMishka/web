import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { removeCategory } from "../../slices/categoriesSlice";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";

export const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("Добавить");

  const editHandler = (thisId: string) => {
    setTitle("Изменить");
    setId(thisId);
    openCategoryModal();
  };

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setId("");
    setTitle("Добавить");
  };
  return (
    <>
      {categories.map((category) => (
        <Card key={category._id} style={{ marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6">{category.name}</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#333" }}
              onClick={() => editHandler(category._id)}
            >
              Изменить
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red" }}
              onClick={() => dispatch(removeCategory(category._id))}
            >
              Удалить
            </Button>
          </CardContent>
        </Card>
      ))}
      <Dialog open={isCategoryModalOpen} onClose={closeCategoryModal}>
        <DialogTitle>{title} категорию</DialogTitle>
        <DialogContent>
          <CategoryForm onClose={closeCategoryModal} id={id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCategoryModal} sx={{ color: "red" }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#333" }}
        onClick={openCategoryModal}
      >
        Добавить категорию
      </Button>
    </>
  );
};
