// import React from "react";

// import { useNavigate } from "react-router-dom";
// import userAuthStore from "../stores/user-store";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Auth.css";

function Authentication() {
  //   const { setUser } = userAuthStore();
  //   const navigate = useNavigate();
  const [signUpUser, setSignUpUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const validateSignUpUser = () => {
    let message = "";

    if (!signUpUser.name.trim()) {
      message = "Name is required.";
      return message;
    }

    if (!signUpUser.email) {
      message = "Email is required.";
      return message;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(signUpUser.email)
    ) {
      message = "Invalid email format.";
      return message;
    }

    if (!signUpUser.password) {
      message = "Password is required.";
      return message;
    }
    // else if (
    //   !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(signUpUser.password)
    // ) {
    //   message =
    //     "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.";
    //   return message;
    // }
    else if (signUpUser.password.length < 8) {
      message = "Password must be at least 8 characters long.";
      return message;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginUser);
  };

  const loginRef = useRef();

  const handleSignUp = (e) => {
    e.preventDefault();
    const validationErrors = validateSignUpUser();
    if (validationErrors) {
      toast.error(validationErrors);
      return;
    }
    loginRef.current.click();

    setLoginUser({
      email: signUpUser.email,
      password: "",
    });

    setSignUpUser({
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              placeholder="User name"
              required=""
              value={signUpUser.name}
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  name: e.target.value,
                })
              }
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              value={signUpUser.email}
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  email: e.target.value,
                })
              }
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              value={signUpUser.password}
              onChange={(e) =>
                setSignUpUser({
                  ...signUpUser,
                  password: e.target.value,
                })
              }
            />
            <button onClick={handleSignUp} id="btn">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true" ref={loginRef}>
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              value={loginUser.email}
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  email: e.target.value,
                })
              }
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              value={loginUser.password}
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  password: e.target.value,
                })
              }
            />
            <button onClick={handleLogin} id="btn">
              Login
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Authentication;
