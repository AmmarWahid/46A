// PushNotificationConfig.js
import PushNotification from 'react-native-push-notification';

export const configurePushNotifications = () => {
  PushNotification.configure({
    // Add other configuration options here

    // Android-specific configuration
    android: {
      channelId: '355', // Provide a unique channel ID
      channelName: 'Default Channel',
      importance: 4, // (Optional) Default: 4 - High, 3 - Medium, 2 - Low, 1 - Min
    },
  });
};
