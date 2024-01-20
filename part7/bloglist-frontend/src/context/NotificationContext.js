import { createContext, useReducer, useContext } from "react";

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "showNotification":
      return action.payload;
    case "hideNotification":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const notificationDispatch = () => {
  const dispatch = useContext(NotificationContext);
  return dispatch[1];
};

export const notificationValue = () => {
  const dispatch = useContext(NotificationContext);
  return dispatch[0];
};

export default NotificationContext;
