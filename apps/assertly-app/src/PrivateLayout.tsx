import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <div className="dark flex flex-col h-[100vh] bg-zinc-900">
      <Outlet/>
    </div>
  );
}

export default PrivateLayout;
