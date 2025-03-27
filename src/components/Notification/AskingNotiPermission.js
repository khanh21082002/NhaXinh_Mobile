import PushNotification from 'react-native-push-notification';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const AskingNotificationPermissionToken = async () => {
  return new Promise((resolve, reject) => {
    let token = '';

    // Yêu cầu quyền thông báo trên iOS
    if (Platform.OS === 'ios') {
      const result = request(PERMISSIONS.IOS.NOTIFICATIONS);
      if (result === RESULTS.GRANTED) {
        // Nếu quyền đã được cấp, bạn có thể lấy token
        PushNotification.configure({
          onRegister: function(tokenData) {
            token = tokenData.token; // Lưu token
            resolve(token); // Khi có token, resolve promise
          },
          onNotification: function(notification) {
            console.log('Notification received:', notification);
          },
          requestPermissions: true,
        });
      } else {
        console.log('Permission denied for notifications');
        reject('Permission denied');
      }
    } else {
      // Trên Android, các quyền không cần yêu cầu cụ thể, nhưng bạn có thể cấu hình thông báo
      PushNotification.configure({
        onRegister: function(tokenData) {
          token = tokenData.token; // Lưu token
          resolve(token); // Khi có token, resolve promise
        },
        onNotification: function(notification) {
          console.log('Notification received:', notification);
        },
        requestPermissions: true,
      });
    }
  });
};

export default AskingNotificationPermissionToken;
