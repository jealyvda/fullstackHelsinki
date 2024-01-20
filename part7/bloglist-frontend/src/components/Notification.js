import { notificationValue } from "../context/NotificationContext";
import "../index.css";

const Notification = () => {
  const notification = notificationValue();

  if (notification.message === "") {
    return null;
  }

  // Update later such that classname can also be success
  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
