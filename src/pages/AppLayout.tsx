import Map from "../components/Map";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <section className="grid grid-cols-2">
      <Sidebar />
      <Map />
    </section>
  );
}

export default AppLayout;
