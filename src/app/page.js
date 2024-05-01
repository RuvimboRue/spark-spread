import Info from "@/components/Info";
import MenuBar from "@/components/Menu";
import FieldSelector from "@/components/Select";
import Topbar from "@/components/Topbar";

export default async function Home() {
  return (
    <div className="h-screen bg-gray-300 d-flex flex-column justify-content-center">
      <Topbar/>
      <MenuBar />
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <Info />
        <FieldSelector/>
      </div>
    </div>
  );
}