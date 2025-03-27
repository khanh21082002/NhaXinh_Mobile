import React, {useState ,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
//redux
import {useSelector} from 'react-redux';
//Color
import Colors from '../../utils/Colors';
//Component
import {ProductBody} from './components';

export const ProductScreen = props => {
  const products = useSelector(state => state.store.products);
  const user = useSelector(state => state.auth.user);
  const [productsFilter, setproductsFilter] = useState(products);
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const searchFilterFunction = text => {
    const data = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
    setproductsFilter(data);
  };
  return (
    <View style={styles.container}>
      {showSnackbar && <Snackbar checkVisible={showSnackbar} message={message} />}
      <ProductBody
        user={user}
        navigation={props.navigation}
        productsFilter={productsFilter}
        searchFilterFunction={searchFilterFunction}
        setMessage={setMessage}
        setShowSnackbar={setShowSnackbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
