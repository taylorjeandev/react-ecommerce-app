import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/">Telenor </Link>
      <Link to="/cart">Cart </Link>
    </header>
  );
}
