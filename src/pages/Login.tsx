import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (email && password) login(email, password);
  };

  return (
    <section className="bg-colorDark-1 p-10">
      <PageNav />
      <div className="bg-colorLight-2 p-8 rounded-md shadow-md md:w-1/2  mx-auto mt-36 ">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="border border-gray-300 rounded-md w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="border border-gray-300 rounded-md w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onSubmit={handleSubmit} type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
