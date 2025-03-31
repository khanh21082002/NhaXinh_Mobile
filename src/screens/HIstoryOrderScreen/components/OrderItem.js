import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '../../../styles';

const OrderItem = ({ orderHistory, onPressDetails }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Image + Info */}
        <View style={styles.row}>
          {orderHistory.products[0]?.images && orderHistory.products[0].images.length > 0 ? (
            <Image
              style={styles.image}
              source={{ uri: orderHistory.products[0].images[0].imageUrl }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../../../assets/images/default-error-image.png')}
            />
          )}

          {/* Product Details */}
          <View style={styles.details}>
            <Text style={styles.productName} numberOfLines={1}>
              {orderHistory.orderId}
            </Text>
            <Text style={styles.price}>
              {formatCurrency(orderHistory.totalPrice)} đ
            </Text>
          </View>

          {/* Detail Button */}
          <TouchableOpacity style={styles.button} onPress={onPressDetails}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default OrderItem;
