import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../../../styles';

const PaymentDetails = ({ price, shipping, discount, total }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Tổng tiền hàng</Text>
        <Text style={styles.value}>{formatCurrency(price)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phí vận chuyển</Text>
        <Text style={styles.value}>{shipping === 0 ? 0 : formatCurrency(shipping)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ưu đãi</Text>
        <Text style={[styles.value, styles.discount]}>-{formatCurrency(discount)}</Text>
      </View>
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Thành tiền</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  discount: {
    color: '#4CAF50',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
});

export default PaymentDetails;