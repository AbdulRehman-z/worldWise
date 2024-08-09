import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";

function Sidebar() {
  return (
    <div className="py-3 bg-colorDark-1 flex flex-col text-white justify-between items-center">
      <div className="flex flex-col items-center mt-5">
        <Logo />
        <AppNav />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Sidebar;
