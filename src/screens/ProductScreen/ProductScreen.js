import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
//redux
import {useSelector} from 'react-redux';
//Color
import Colors from '../../utils/Colors';
//Component
import {ProductBody} from './components';
import Snackbar from '../../components/Notification/Snackbar';

export const ProductScreen = props => {
  const products = useSelector(state => state.store.products);
  const materials = useSelector(state => state.material.materials);
  const user = useSelector(state => state.auth.user);
  const [productsFilter, setProductsFilter] = useState(products);
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  
  const searchFilterFunction = (text, preFilteredData = null, filters = null) => {
    // Start with all products or pre-filtered data if provided
    let data = preFilteredData || products;
    
    // Apply text search if provided
    if (text) {
      data = data.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      );
    }
    
    // Apply filters if provided
    if (filters) {
      // Apply material filter
      if (filters.material !== "Tất cả") {
        data = data.filter(product => 
          product.materialName === filters.material
        );
      }
      
      // Apply price sorting
      if (filters.price === "Theo giá: Thấp đến cao") {
        data = [...data].sort((a, b) => a.price - b.price);
      } else if (filters.price === "Theo giá: Cao đến thấp") {
        data = [...data].sort((a, b) => b.price - a.price);
      }
    }
    
    setProductsFilter(data);
  };

  return (
    <View style={styles.container}>
      {showSnackbar && <Snackbar checkVisible={showSnackbar} message={message} />}
      <ProductBody
        user={user}
        materials={materials}
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

export default ProductScreen;