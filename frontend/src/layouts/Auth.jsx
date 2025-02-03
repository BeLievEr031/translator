import { Navigate, Outlet } from "react-router-dom";
import userAuthStore from "../stores/user-store";

function Auth() {
  const { user, isLoggedIn } = userAuthStore();

  //   if (user === null) {
  //     return <Navigate to={"/auth"} replace={true} />;
  //   }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Auth;
