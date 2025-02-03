import { SignIn } from "@clerk/clerk-react";
import "./Auth.css";

function ClerkAuth() {
  return (
    <div className="auth-container">
      <SignIn />
    </div>
  );
}

export default ClerkAuth;
