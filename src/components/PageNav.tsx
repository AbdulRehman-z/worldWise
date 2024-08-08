import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className="p-4 flex justify-between items-center">
      <Logo />
      <ul className="flex space-x-5 justify-start">
        <li>
          <NavLink to="/pricing" className="link">
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" className="link">
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="btn-primary">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
