import React, { useEffect, useState } from 'react';
import { LogBox, Linking, ActivityIndicator, View, Image  , Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import { DrawerNavigator, IntroStackScreen } from './StoneNavigator';
import { Logout } from '../reducers';
import { Host } from 'react-native-portalize';
import { onMessage, setBackgroundMessageHandler, onNotificationOpenedApp, getInitialNotification } from '../firebaseNotification';
import { urlRedirect } from '../utils/Tools';
import ARScreen from '../screens/ARScreen/ARScreen'; // Import ARScreen
import PaymentMethodScreen from '../screens/BankScreen/PaymentMethodScreen';

const { height, width } = Dimensions.get("window");
LogBox.ignoreLogs(['Setting a timer']);

const MainStack = createStackNavigator(); // Tạo Stack Navigator mới

export const AppNavigator = () => {
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isFirstOpen = useSelector((state) => state.store.isFirstOpen);

  // Xử lý Deep Linking
  useEffect(() => {
    const handleUrl = (event) => {
      urlRedirect(event.url);
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then(urlRedirect);

    return () => {
      subscription.remove();
    };
  }, []);

  // Kiểm tra lần đầu mở app & Auto Logout
  useEffect(() => {
    const initializeApp = async () => {
      try {
        let firstOpen = await AsyncStorage.getItem('isFirstTime');
        if (firstOpen === null) {
          await AsyncStorage.setItem('isFirstTime', 'true');
          firstOpen = 'true';
        }
    
        setIsFirstTime(firstOpen === 'true');
    
        const getUser = await AsyncStorage.getItem('user');
        if (getUser) {
          const user = JSON.parse(getUser);
          if (user.data.expireTime - Date.now() < 0) {
            dispatch(Logout());
          }
        }
      } catch (error) {
        console.error('⚠️ Lỗi khi đọc AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    

    initializeApp();
  }, []);

// Xử lý thông báo
  useEffect(() => {
    // Khởi tạo thông báo khi app ở foreground
    const unsubscribeOnMessage = onMessage(async (remoteMessage) => {
      console.log('Thông báo nhận được trong foreground:', remoteMessage);
      // Bạn có thể thực hiện bất kỳ hành động nào khi nhận thông báo ở đây
    });

    // Khởi tạo thông báo khi app ở background
    const unsubscribeBackgroundMessage = setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Thông báo nhận được trong background:', remoteMessage);
      // Xử lý khi app ở chế độ background
    });

    // Khi ứng dụng được mở từ notification
    const unsubscribeNotificationOpened = onNotificationOpenedApp((remoteMessage) => {
      console.log('Thông báo được mở từ background:', remoteMessage);
      // Xử lý khi app mở từ notification
    });

    // Khi app bị kill và người dùng mở lại qua notification
    const unsubscribeInitialNotification = getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Thông báo nhận được khi app bị kill:', remoteMessage);
        // Xử lý khi mở từ notification khi app bị kill
      }
    });

    // Clean up khi component unmount
    return () => {
      unsubscribeOnMessage();
      unsubscribeBackgroundMessage();
      unsubscribeNotificationOpened();
      unsubscribeInitialNotification();
    };
  }, []);

  if (loading) {
    return (
      <View>
        <Image
          source={require('../assets/images/bg_slide1.png')}
          style={{ width: width, height: height, resizeMode: "cover" }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {/* Kiểm soát điều hướng hợp lý */}
          {!isFirstOpen && isFirstTime === null ? (
            <MainStack.Screen name="Intro" component={IntroStackScreen} />
          ) : (
            <MainStack.Screen name="MainDrawer" component={DrawerNavigator} />
          )}

          {/* Màn hình AR sẽ chỉ hiển thị khi được gọi từ navigation */}
          <MainStack.Screen name="AR" component={ARScreen} />

        </MainStack.Navigator>
      </Host>
    </NavigationContainer>
  );
};
