import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import userAuthStore from "../stores/user-store";

function Root() {
  console.log("Root");
  const { user, isLoggedIn, setUser, setLogin } = userAuthStore();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("I AM RUNNING");
  }, [isLoggedIn]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Root;
