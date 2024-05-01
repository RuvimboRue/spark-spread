import Info from "@/components/Info";
import MenuBar from "@/components/Menu";
import FieldSelector from "@/components/Select";
import DataTable from "@/components/Table";
import Topbar from "@/components/Topbar";

export default async function Optimization() {
  return (
    <>
      <Topbar />
      <div className="h-screen bg-gray-300 flex flex-col justify-center items-center">
        <MenuBar className="mt-0" /> {/* Apply mt-0 class here */}
        <div className="mx-auto">
          <DataTable />
        </div>
      </div>
    </>
  );
}