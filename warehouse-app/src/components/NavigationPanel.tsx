import { AppBar, Toolbar, Button } from "@mui/material";

export interface NavigationPanelProps {
  onClick: () => void;
}

export const NavigationPanel = ({ onClick }: NavigationPanelProps) => {
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
        <Button color="inherit">Products</Button>
        <Button color="inherit">Warehouses</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Profile</Button>
      </Toolbar>
    </AppBar>
  );
};
