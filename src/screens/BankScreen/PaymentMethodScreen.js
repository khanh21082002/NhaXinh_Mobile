import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { WebView } from 'react-native-webview';
import { Header } from './components';
import { fetchCreatePayment } from '../../reducers';

const PaymentMethodScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { orderId } = route.params;

  const loadUrl = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Gọi API để lấy URL thanh toán
      const url = await dispatch(fetchCreatePayment(orderId));
      if (url) {
        setPaymentUrl(url);
      } else {
        console.log('URL thanh toán không hợp lệ');
      }
      setIsRefreshing(false);
    } catch (err) {
      alert('Có lỗi xảy ra, vui lòng thử lại!');
      setIsRefreshing(false);
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    loadUrl();
  }, [loadUrl]);

  // Hiển thị ActivityIndicator khi đang tải trang
  const checkLoading = () => {
    return isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Thanh toán" />
      {checkLoading()}
        {isRefreshing ? (
          <Text style={styles.waitingText}>Đang kết nối với cổng thanh toán...</Text>
        ) : paymentUrl ? (
          <WebView
            source={{ uri: paymentUrl }}  
            javaScriptEnabled={true}
            scalesPageToFit={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            style={{ flex: 1}}
            onLoad={() => {
              setIsLoading(false);  // Trang đã tải xong
              console.log('WebView loaded');
            }}
            onError={err => {
              console.log('Lỗi khi tải WebView: ', err);
              alert('Có lỗi khi tải trang thanh toán!');
            }}
            onNavigationStateChange={navState => {
              console.log('Navigation state:', navState);
              if (navState.url.includes('vnp_ResponseCode')) {
                // Xử lý kết quả thanh toán tại đây
                console.log('Kết quả thanh toán:', navState.url);
              }
            }}
          />
        ) : (
          <Text style={styles.waitingText}>Đang chờ kết nối thanh toán...</Text>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#005baa',
    marginVertical: 12,
    textAlign: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentMethodScreen;
