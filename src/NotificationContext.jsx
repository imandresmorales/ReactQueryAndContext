import { createContext } from "react";

import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "notification":
      return action.payload;
    case "error":
      return action.payload;
    case "hide":
      return null;
    default:
      return state;
  }
};

export const showNotification = (message) => {
  return {
    type: "notification",
    payload: message,
  };
};

export const showError = (message) => {
  return {
    type: "error",
    payload: message,
  };
};

export const hideNotification = () => {
  return {
    type: "hide",
    payload: "",
  };
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, null);
  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
