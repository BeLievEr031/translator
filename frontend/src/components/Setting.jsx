import { useClerk } from "@clerk/clerk-react";
import { IoSettings } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";

function Setting() {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      // After logging out, you can redirect the user to a different page like the login page
      <Navigate to="/auth" replace />;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="setting icon">
      <IoSettings size={35} />
      <div className="setting-action">
        <div>
          <Link to={"/history"}>History</Link>
        </div>
        <hr />
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}

export default Setting;
