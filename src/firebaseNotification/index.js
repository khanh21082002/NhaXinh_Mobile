// firebaseNotification.js
import messaging from '@react-native-firebase/messaging';

export const onMessage = (callback) => {
  messaging().onMessage(callback);
};

export const setBackgroundMessageHandler = (callback) => {
  messaging().setBackgroundMessageHandler(callback);
};

export const onNotificationOpenedApp = (callback) => {
  messaging().onNotificationOpenedApp(callback);
};

export const getInitialNotification = () => {
  return messaging().getInitialNotification();
};
