import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview'; // Import WebView
// Các import khác
import Colors from '../../../utils/Colors';
import ItemList from '../../PreOrderScreen/components/PreOrderItem';
import NumberFormat from '../../../components/UI/NumberFormat';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomText from '../../../components/UI/CustomText';
import Steps from '../../../components/UI/Steps';
import {AppColors} from '../../../styles';
import {navigate} from '../../../navigation/RootNavigation';

moment.locale('vi');

export const OrderItem = ({order, user, productList}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showWebView, setShowWebView] = useState(false); // Thêm state để kiểm tra WebView
  const status = () => {
    switch (order.status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'delivered':
        return 3;
      // case 'received':
      //   return 4;
      default:
        return -1;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Mã đơn: </CustomText>
          <CustomText style={styles.detail}>{order.orderId}</CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Ngày đặt: </CustomText>
          <CustomText style={styles.detail}>
            {moment(order.createdAt)
              .add(7, 'hours')
              .format('Do MMMM YYYY, hh:mm a')}
          </CustomText>
        </View>

        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails(prev => !prev)}>
            <CustomText style={{fontSize: 15, color: '#fff'}}>
              {showDetails ? 'Ẩn đơn hàng' : 'Chi tiết đơn hàng'}
            </CustomText>
          </TouchableOpacity>
        </View>

        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Tên người nhận: </CustomText>
              <CustomText style={styles.detail}>
                {user.firstName + ' ' + user.lastName}
              </CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Địa chỉ: </CustomText>
              <CustomText style={styles.detail}>
                {order.shippingAddress}
              </CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Số điện thoại: </CustomText>
              <CustomText style={styles.detail}>{user.phone}</CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>
                Phương thức thanh toán:{' '}
              </CustomText>
              <CustomText style={styles.detail}>
                {order.paymentMethod === 'cash'
                  ? 'Thanh toán bằng tiền mặt'
                  : order.paymentMethod === 'Banking'
                  ? 'Thanh toán qua ngân hàng'
                  : 'Thanh toán trực tuyến'}
              </CustomText>
            </View>

            {/* Nếu phương thức thanh toán là 'Banking' thì hiển thị nút WebView */}
            {order.paymentMethod === 'banking' &&
              order.status === 'confirmed' &&
              !showWebView && (
                <View
                  style={[
                    styles.detailButtom,
                    {marginTop: 10, backgroundColor: AppColors.primaryButton},
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('PaymentMethod', {orderId: order.orderId})
                    }>
                    <CustomText style={{fontSize: 15, color: '#fff'}}>
                      Thanh toán qua ngân hàng
                    </CustomText>
                  </TouchableOpacity>
                </View>
              )}

            <View style={styles.steps}>
              <Steps position={status()} />
            </View>

            <CustomText style={{fontSize: 15, marginTop: 10}}>
              Sản phẩm đã đặt:
            </CustomText>
            {order.orderInfo.map(item => {
              const product = productList.find(
                p => p.productId === item.productId,
              );
              return product ? (
                <View key={item.productId}>
                  <ItemList item={product} quantity={item.quantity} />
                </View>
              ) : null;
            })}

            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <CustomText style={styles.text}>Tổng tiền:</CustomText>
              <NumberFormat
                price={order.totalPrice.toString()}
                style={{fontSize: 15}}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detail: {
    color: AppColors.primary,
  },
  steps: {
    width: '100%',
    height: 100,
  },
});

export default OrderItem;
