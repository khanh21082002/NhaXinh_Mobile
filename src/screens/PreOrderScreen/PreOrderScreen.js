import React, {useState, useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, StyleSheet, ScrollView} from 'react-native';
//Address
import Address from './components/Address';
//Redux
import {useSelector} from 'react-redux';
//Steps
import Colors from '../../utils/Colors';
import {Header, SummaryOrder, TotalButton, UserForm} from './components';
import Loader from '../../components/Loaders/Loader';
import CustomText from '../../components/UI/CustomText';

export const PreOrderScreen = props => {
  const unmounted = useRef(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const carts = useSelector(state => state.cart.cartItems);
  const productList = useSelector(state => state.store.products);
  const user = useSelector(state => state.auth.user);

  const {cartItems, total, cartId} = props.route.params;
  const [error, setError] = useState('');
  //Can Toi uu lai
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [town, setTown] = useState('');
  const [ward, setWard] = useState('');
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      const interval = setInterval(() => {
        setLoading(false);
      }, 1000);
      return () => clearInterval(interval);
    }
    return;
  }, [isFocused]);
  const getInfo = (province, town , ward) => {
    setProvince(province);
    setTown(town);
    setWard(ward);
  };
  const getReceiver = (name, phone, address) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
  };
  const checkValidation = error => {
    setError(error);
  };
  let orderItems = [];
  cartItems.map(item => {
    orderItems.push({item: item.productId, quantity: item.quantity});
  });

  const shippingAddress = `${province}`;
  const fullAddress = `${province}, ${town} ,${ward}`;
  const toPayment = async () => {
    try {
      if (error == undefined && province.length !== 0 && town.length !== 0 && ward.length !== 0) {
        props.navigation.navigate('Payment', {
          screen: 'PaymentScreen',
          params: {
            shippingAddress,
            fullAddress,
            orderItems,
            name,
            phone,
            total,
            cartId,
            carts,
          },
        });
      } else {
        alert('Vui lòng nhập đầy đủ thông tin.');
      }
    } catch (err) {
      throw err;
    }
    // props.navigation.navigate("Payment", {
    //   screen: "PaymentScreen",
    //   params: {
    //     fullAddress,
    //     orderItems,
    //     name,
    //     phone,
    //     total,
    //     cartId,
    //     carts,
    //   },
    // });
  };
  useEffect(() => {
    if (carts.items?.length === 0) {
      props.navigation.goBack();
    }
  }, [carts.items]);
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <UserForm
              initialValues={{
                name: user.firstName + ' ' + user.lastName,
                phone: user.phone,
                address: user.address,
              }}
              getReceiver={getReceiver}
              checkValidation={checkValidation}
            />
            <Address getInfo={getInfo} />
            <SummaryOrder
              cartItems={cartItems}
              total={total}
              productList={productList}
            />
          </ScrollView>
          <TotalButton toPayment={toPayment} />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
});
