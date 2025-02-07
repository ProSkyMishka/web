import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface NavigationPanelProps {
  onClick: () => void;
}

export const NavigationPanel = ({ onClick }: NavigationPanelProps) => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button color="inherit" onClick={onClick}>
          Menu
        </Button>
        <Button onClick={() => navigate("/products")} color="inherit">
          Products
        </Button>
        <Button color="inherit">Warehouses</Button>
        <Button color="inherit">About</Button>
        <Button onClick={() => navigate("/profile")} color="inherit">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};
