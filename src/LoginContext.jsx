import { createContext, useReducer } from "react";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "loginUser":
      return { ...state, username: action.payload.username };
    case "loginPassword":
      return { ...state, password: action.payload.password };
    case "del":
      return { ...state, username: "", password: "" };
    default:
      return state;
  }
};

const initialState = {
  username: "",
  password: "",
};

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [data, dataDispatch] = useReducer(loginReducer, initialState);

  return (
    <LoginContext.Provider value={[data, dataDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
