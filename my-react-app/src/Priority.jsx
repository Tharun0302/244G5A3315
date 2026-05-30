import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NotificationCard from './NotificationCard';
import { fetchNotifications } from './api';

const Priority = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const priorityOrder = { Placement: 1, Result: 2, Event: 3 };

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);

      // Fetch all notifications without pagination
      const allNotifications = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const data = await fetchNotifications(page, 100, 'All', user?.userId);
        if (data.notifications && data.notifications.length > 0) {
          allNotifications.push(...data.notifications);
          page++;
        } else {
          hasMore = false;
        }
      }

      // Sort by priority and date
      const sortedNotifications = allNotifications.sort((a, b) => {
        // First sort by priority
        const priorityA = priorityOrder[a.notification_type] || 999;
        const priorityB = priorityOrder[b.notification_type] || 999;

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        // Then sort by date (newest first)
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      // Take top 10
      setNotifications(sortedNotifications.slice(0, 10));
      setLoading(false);
    };

    loadNotifications();
  }, [refreshKey, user]);

  const isNotificationViewed = (id) => {
    const viewedIds = JSON.parse(localStorage.getItem('viewedNotifications')) || [];
    return viewedIds.includes(id);
  };

  const handleViewChange = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div className="container">
      <h1>Priority Inbox</h1>
      <p className="priority-info">Top 10 Notifications (Placement &gt; Result &gt; Event)</p>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="notifications-list">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                isViewed={isNotificationViewed(notification.id)}
                onViewChange={handleViewChange}
              />
            ))}
          </div>

          {notifications.length === 0 && (
            <p className="no-notifications">No notifications found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Priority;
