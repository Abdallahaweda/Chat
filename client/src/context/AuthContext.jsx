import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [registerError, setRegisterError] = useState(null);
  let [isRegisterLoading, setIsRegisterLoading] = useState(false);
  let [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  let [loginError, setLoginError] = useState(null);
  let [isLoginLoading, setIsLoginLoading] = useState(false);

  let [loginInfo, setLoginInfo] = useState({
    email: "",

    password: "",
  });
  // console.log("user", user);
  // console.log("register Info", registerInfo);
  // console.log("Login Info", loginInfo);

  useEffect(() => {
    let user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const ubdateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const ubdateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  let registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  let loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  let logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        ubdateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        ubdateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
