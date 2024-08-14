import React, { useEffect, useState } from 'react';
import { getNotifications } from '../../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        // Ensure data is an array before setting notifications
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.error('Unexpected data format:', data);
          setNotifications([]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();

    // Poll for new notifications every 10 seconds
    const intervalId = setInterval(fetchNotifications, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"> {/* Added z-50 */}
      <div className="py-2 px-4 font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
        Notifications
      </div>
      <ul className="max-h-60 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="font-medium">{notification.sopId}</span> - {notification.type}
            </li>
          ))
        ) : (
          <li className="py-2 px-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </li>
        )}
      </ul>
    </div>
  );
  
};

export default Notifications;
