import React, { useContext, createContext } from "react";
import DisplayStatus from "./DisplayStatus";

// Export context so LoginForm can use it
export const AuthContext = createContext();

const AuthMessage = () => {
  const { authStatus } = useContext(AuthContext);

  return (
    authStatus.message && (
      <DisplayStatus type={authStatus.type} message={authStatus.message} />
    )
  );
};

export default AuthMessage;
