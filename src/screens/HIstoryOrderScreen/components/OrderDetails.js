import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import PaymentDetails from './PaymentDetails';
import { AppColors } from '../../../styles';

const OrderDetails = ({orderId}) => {
  // Lấy dữ liệu từ Redux store
  const user = useSelector(state => state.auth.user);
  const orderHistory = useSelector(state => state.order.orderHistory);
  const productList = useSelector(state => state.store.products);

  // Tìm đơn hàng theo orderId
  const order = orderHistory.find(order => order.orderId === orderId);
  if (!order) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy đơn hàng.</Text>
      </View>
    );
  }

  const formatCurrency = amount => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Hiển thị tất cả các sản phẩm */}
          {order.orderInfo.map((orderItem, index) => {
            const product = productList.find(
              p => p.productId === orderItem.productId,
            );

            return (
              <View key={index} style={styles.orderItem}>
                <Image
                  style={styles.image}
                  source={
                    product.images && product.images.length > 0
                      ? {
                          uri: product.images.find(image => image.isPrimary)
                            ?.imageUrl,
                        }
                      : require('../../../assets/images/default-error-image.png')
                  }
                />
                <View style={{flex: 1}}>
                  <View style={styles.productInfo}>
                    <Text style={styles.sectionTitle}>{product?.name}</Text>
                    <Text style={styles.quantityText}>
                      x{orderItem.quantity}
                    </Text>
                  </View>

                  <Text style={styles.price}>
                    {formatCurrency(orderItem.price)} ₫
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Tính tiền */}
          <PaymentDetails
            price={order.totalPrice}
            shipping={0}
            discount={0}
            total={order.totalPrice}
          />

          {/* Địa chỉ giao hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ nhận hàng</Text>
            <Text style={styles.addressName}>
              {user?.firstName + ' ' + user?.lastName}
            </Text>
            <Text style={styles.addressPhone}>{user?.phone}</Text>
            <Text style={styles.addressText}>{order.shippingAddress}</Text>
          </View>

          {/* Vận chuyển */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin vận chuyển</Text>
            <View style={styles.deliveryStatus}>
              <View style={styles.deliveryStatusIcon}>
                <Text>🚚</Text>
              </View>
              <View>
                <Text style={styles.deliveryStatusText}>
                  {order.status === 'shipped' ? 'Đang giao hàng' : 'Đã giao'}
                </Text>
                <Text style={styles.deliveryDate}>
                  {new Date(order.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Thanh toán */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Mã đơn hàng</Text>
              <Text style={styles.paymentValue}>{order.orderId}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Thanh toán</Text>
              <Text style={styles.paymentValue}>
                {order.paymentMethod === 'cash'
                  ? 'Chưa thanh toán'
                  : 'Đã thanh toán'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.complaintButton}>
          <Text style={styles.complaintButtonText}>Khiếu nại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.rateButtonText}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.primary,
    textAlign: 'right',
  },
  addressName: {
    fontSize: 15,
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  deliveryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  deliveryStatusText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  complaintButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 8,
  },
  complaintButtonText: {
    fontSize: 16,
    color: '#333',
  },
  rateButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: AppColors.primary,
    borderRadius: 4,
    alignItems: 'center',
    marginLeft: 8,
  },
  rateButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderDetails;
