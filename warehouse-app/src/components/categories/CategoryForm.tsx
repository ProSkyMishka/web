import { useEffect, useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addCategory, editCategory } from "../../slices/categoriesSlice";

interface CategoryFormProps {
  onClose: () => void;
  id?: string;
}

export const CategoryForm = (formProps: CategoryFormProps) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");

  const cat = useAppSelector((state) =>
    state.categories.categories.find((p) => p.id === formProps.id)
  );

  useEffect(() => {
    if (formProps.id) {
      if (!cat) {
        formProps.onClose();
        return;
      }

      setCategory(cat.name);
    }
  }, [formProps.id, cat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Название категории обязательно!");
      return;
    }

    if (formProps.id) {
      dispatch(
        editCategory({
          id: formProps.id,
          name: category,
        })
      );
    } else {
      dispatch(
        addCategory({
          name: category,
        })
      );
    }

    formProps.onClose();
  };

  return (
    <Box>
      <TextField
        label="Название категории"
        name="name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#333" }}
        onClick={handleSubmit}
      >
        Сохранить
      </Button>
    </Box>
  );
};
