import { NavLink } from "react-router-dom";

const AppNav = () => {
  return (
    <nav className="bg-colorDark-2 rounded-md flex items-center mt-16">
      <NavLink
        to="cities"
        className={`px-7 py-1 rounded-md shadow-md focus:bg-colorDark-0 transition-all duration-100 ease-linear
		`}
      >
        Cities
      </NavLink>
      <NavLink
        to="countries"
        className={`px-7 py-1 rounded-md shadow-md 	focus:bg-colorDark-0 transition-all duration-100 ease-linear`}
      >
        Countries
      </NavLink>
    </nav>
  );
};

export default AppNav;
