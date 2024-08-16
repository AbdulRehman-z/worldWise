import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function User() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  console.log(user);
  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className="bg-colorDark-1 absolute z-50 left-1/2 mt-2 ml-64 -translate-x-1/2 rounded-md shadow-md flex items-center gap-2 px-4 py-2 w-1/3">
      <img
        src={user?.avatar}
        alt={user?.name}
        className=" rounded-full size-16"
      />
      <span className="text-colorLight-2">Welcome, {user?.name}</span>
      <button className="btn-primary bg-colorDark-2 ml-3" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default User;
