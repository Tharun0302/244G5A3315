import React from 'react';

const NotificationCard = ({ notification, isViewed, onViewChange }) => {
  const handleClick = () => {
    const viewedIds = JSON.parse(localStorage.getItem('viewedNotifications')) || [];

    if (!viewedIds.includes(notification.id)) {
      viewedIds.push(notification.id);
      localStorage.setItem('viewedNotifications', JSON.stringify(viewedIds));
      onViewChange();
    }
  };

  return (
    <div className="notification-card" onClick={handleClick}>
      <div className="notification-header">
        <h3 className="notification-title">{notification.title}</h3>
        <span className={`status ${isViewed ? 'viewed' : 'new'}`}>
          {isViewed ? 'VIEWED' : 'NEW'}
        </span>
      </div>
      <p className="notification-message">{notification.message}</p>
      <div className="notification-footer">
        <span className="notification-type">{notification.notification_type}</span>
        <span className="notification-date">
          {new Date(notification.timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
