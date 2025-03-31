import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import OrderItem from './OrderItem';

const OrderHistoryBody = ({onSelectOrder, orderHistory, productList}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orderHistory}
        keyExtractor={item => item.orderId}
        renderItem={({item}) => {
          // Tìm sản phẩm tương ứng với đơn hàng
          const productDetails = item.orderInfo.map(orderItem => {
            return productList.find(p => p.productId === orderItem.productId);
          });

          return (
            <OrderItem
              orderHistory={{
                ...item,
                products: productDetails, // Truyền các sản phẩm cho đơn hàng
              }}
              onPressDetails={() => onSelectOrder(item.orderId)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default OrderHistoryBody;
