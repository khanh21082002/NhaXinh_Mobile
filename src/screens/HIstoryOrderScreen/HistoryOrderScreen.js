import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import OrderHistoryBody from './components/OrderHistoryBody';
import OrderDetails from './components/OrderDetails';
import {Header} from './components';
import {useNavigation} from '@react-navigation/native';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {fetchOrderHistory} from '../../reducers';

const HistoryOrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const orderHistory = useSelector(state => state.order.orderHistory);
  const productList = useSelector(state => state.store.products);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const loadOrderHistory = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchOrderHistory());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);
  useEffect(() => {
    loadOrderHistory();
  }, []);

  const sortedOrderHistory = [...orderHistory].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Handle going back to order list
  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedOrderId(null);
  };

  // Handle viewing order details
  const handleViewDetails = orderId => {
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showDetails ? (
        <>
          <Header
            title="Lịch sử mua hàng"
            onPress={() => navigation.goBack()}
          />
          <OrderHistoryBody
            onSelectOrder={handleViewDetails}
            productList={productList}
            orderHistory={sortedOrderHistory}
          />
        </>
      ) : (
        <>
          <Header title="Chi tiết mua hàng" onPress={handleBackToList} />
          <OrderDetails orderId={selectedOrderId} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default HistoryOrderScreen;
