import React from "react";
import {
  Drawer,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Category } from "../slices/categoriesSlice";

export interface Filters {
  name: string;
  category: string;
  inStock: boolean;
}

interface SidebarProps {
  getFilters: Filters;
  onApplyFilters: (filter: Filters) => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  getFilters,
  onApplyFilters,
  onClose,
}) => {
  const [filters, setFilters] = React.useState({
    name: getFilters.name,
    category: getFilters.category,
    inStock: getFilters.inStock,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const categories = useSelector((state: any) => state.categories.categories);

  return (
    <Drawer anchor="left" open={true} onClose={onClose}>
      <Box sx={{ width: 250, padding: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Product Name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() =>
                    setFilters({
                      name: "",
                      category: filters.category,
                      inStock: filters.inStock,
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() =>
                    setFilters({
                      name: filters.name,
                      category: "",
                      inStock: filters.inStock,
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              ),
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat: Category) => (
              <MenuItem value={cat.id}>{cat.name}</MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inStock}
                onChange={(e) =>
                  setFilters({ ...filters, inStock: e.target.checked })
                }
              />
            }
            label="In Stock Only"
          />
          <Button variant="contained" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              setFilters({ name: "", category: "", inStock: false })
            }
          >
            Reset Filters
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
