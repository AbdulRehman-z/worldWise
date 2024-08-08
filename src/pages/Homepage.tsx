import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
  return (
    <section className=" min-h-[calc(100vh-3rem)] bg-[linear-gradient(rgba(36,42,46,0.8),rgba(36,42,46,0.8)),url('/bg.jpg')] bg-cover bg-center p-10">
      <PageNav />
      <main className="flex flex-col  items-center justify-center gap-5 text-center drop-shadow-md mt-28 ">
        <h1 className="text-white font-bold text-5xl leading-tight">
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2 className="mt-1 text-colorLight-1 text-xl w-4/5 md:w-2/3  font-semibold">
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/" className="btn-primary uppercase mt-7">
          Start Tracking now
        </Link>
      </main>
    </section>
  );
}

export default Homepage;
