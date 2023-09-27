import React, { createContext, useState } from 'react';

export const NotificationContext = createContext<{
  notificationOpen: boolean;
  setNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  notificationOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNotificationOpen: () => {}
});

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  return (
    <NotificationContext.Provider value={{ notificationOpen, setNotificationOpen }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;