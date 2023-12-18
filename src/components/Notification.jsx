import React, { useEffect } from "react";

const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Close the notification after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`notification ${notification.type}`}>
      <div className="notification-content">
        <span className="notification-title">{notification.title}:</span>
        <span className="notification-message">{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;
