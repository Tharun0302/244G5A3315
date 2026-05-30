import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import NotificationCard from './NotificationCard';
import { fetchNotifications } from './api';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const limit = 10;

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      const data = await fetchNotifications(currentPage, limit, selectedFilter, user?.userId);
      setNotifications(data.notifications || []);
      setTotalNotifications(data.total || 0);
      setLoading(false);
    };

    loadNotifications();
  }, [currentPage, selectedFilter, refreshKey, user]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalNotifications / limit);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isNotificationViewed = (id) => {
    const viewedIds = JSON.parse(localStorage.getItem('viewedNotifications')) || [];
    return viewedIds.includes(id);
  };

  const handleViewChange = () => {
    setRefreshKey(refreshKey + 1);
  };

  const totalPages = Math.ceil(totalNotifications / limit);

  return (
    <div className="container">
      <h1>All Notifications</h1>

      <div className="filter-section">
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Placement">Placement</option>
          <option value="Result">Result</option>
          <option value="Event">Event</option>
        </select>
      </div>

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

          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
