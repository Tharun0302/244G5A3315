// API helper function to fetch notifications
const API_BASE_URL = 'http://4.224.186.213/evaluation-service/notifications';

export const fetchNotifications = async (page = 1, limit = 10, notificationType = null, userId = null) => {
  try {
    let url = `${API_BASE_URL}?page=${page}&limit=${limit}`;

    if (userId) {
      url += `&userId=${userId}`;
    }

    if (notificationType && notificationType !== 'All') {
      url += `&notification_type=${notificationType}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { notifications: [], total: 0 };
  }
};
