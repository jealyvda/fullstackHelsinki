import { useContext } from "react";
import NotificationContext from "../context/Notification";
import "../index.css";

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  if (notification.message === "") {
    return null;
  } else if (notification.autoHide >= 0) {
    setTimeout(() => {
      notificationDispatch({ type: "hideNotification" });
    }, notification.autoHide);
  }

  // Update later such that classname can also be success
  return <div className={`notification ${notification.type}`}>{notification.message}</div>;
};

export default Notification;
