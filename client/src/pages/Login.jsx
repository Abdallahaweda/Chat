import "react-icons";
import "./Register.css";
import "./Login.css";
//icons
import { MdEmail } from "react-icons/md";
import { IoKeySharp } from "react-icons/io5";
//animation
import pic from "../assets/registeration.gif";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "react-bootstrap";

//formHook

function Login() {
  const { loginUser, loginError, loginInfo, ubdateLoginInfo, isLoginLoading } =
    useContext(AuthContext);

  return (
    <div className="container d-flex justify-content-center mt-4 align-items-center height containerWidth ">
      <div className="row w-100">
        <div className="col  p-0 d-flex align-items-center slidein">
          <form
            onSubmit={loginUser}
            className="p-4 d-flex align-items-center flex-column w-75  shadow rounded  justify-content-evenly  "
          >
            <div className="input-group mb-2">
              <span
                className="input-group-text  rounded-0 border-0 bg-white"
                id="basic-addon1"
              >
                <i>
                  <MdEmail className="icon fs-3" />
                </i>
              </span>
              <input
                type="email"
                className="form-control  inputBorder border-top-0 border-end-0 border-start-0 rounded-0 shadow-none"
                placeholder="Email Address"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) =>
                  ubdateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
            </div>

            <div className="input-group mb-2">
              <span
                className="input-group-text rounded-0 border-0 bg-white"
                id="basic-addon1"
              >
                <i>
                  <IoKeySharp className="icon fs-3" />
                </i>
              </span>
              <input
                type="password"
                className="form-control inputBorder border-top-0 border-end-0 border-start-0 rounded-0 shadow-none"
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) =>
                  ubdateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="submit ">
              {isLoginLoading ? "Loading" : "Login"}
            </button>
            {loginError?.error && (
              <Alert variant="danger" className="alert ">
                <span className="alertP">{loginError?.message}</span>
              </Alert>
            )}
          </form>
        </div>
        <div className="col me-3 d-flex flex-column align-items-center justify-content-center slideinLeft">
          <div className="d-flex align-items-center justify-content-center img">
            <img src={pic} className="w-75 " />
          </div>
          <div className="mt-5">
            <h5>
              Have an account already?{" "}
              <a
                href=""
                className="link-primary text-decoration-none icon fs-5"
              >
                Login
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
