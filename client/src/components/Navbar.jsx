import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Save Recipe</Link>
      <Link to="/auth">Login/Register</Link>
    </div>
  );
};
export default Navbar;
