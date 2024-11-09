export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <input type="text" placeholder="Search" />
      <br />
      <label>
        <input type="checkbox" />
        Only items in stock
      </label>
      <select>
        <option>All Categories</option>
        <option>Category 1</option>
        <option>Category 2</option>
      </select>
    </aside>
  );
};
