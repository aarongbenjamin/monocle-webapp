import React, { createContext, useState } from 'react';
import { NotificationProps } from '../components/Notification/Notification';
import { Severities } from '../components/Notification/Notification';


export const NotificationContext = createContext<{
  notification: NotificationProps;
  setNotification: React.Dispatch<React.SetStateAction<NotificationProps>>;
}>({
  notification: {
    open: false,
    autoHideDuration: 1000,
    onClose: () => {},
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    severity: Severities.info,
    description: 'this is a notification'
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNotification: () => {}
});

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    autoHideDuration: 1000,
    onClose: () => {},
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    severity: Severities.info,
    description: 'this is a notification'
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;