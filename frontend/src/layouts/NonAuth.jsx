import { Outlet } from "react-router-dom";

function NonAuth() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default NonAuth;
