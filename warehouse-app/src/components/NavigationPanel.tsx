export interface NavigationPanelProps {
  onClick: () => void;
}

export const NavigationPanel = ({ onClick }: NavigationPanelProps) => {
  return (
    <nav className="navigationPanel">
      <button onClick={onClick}>Menu</button>
      <button>Products</button>
      <button>Warehouses</button>
      <button>About</button>
      <button>Profile</button>
    </nav>
  );
};
