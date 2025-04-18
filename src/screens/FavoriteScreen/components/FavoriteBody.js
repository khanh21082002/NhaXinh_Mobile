import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
//Colors
import Colors from '../../../utils/Colors';
//Text
import CustomText from '../../../components/UI/CustomText';
import {FavoriteItem} from './FavoriteItem';
import Messages from '../../../messages/user';
//PropTypes check
import PropTypes from 'prop-types';
import App from '../../../../App';
import {AppColors} from '../../../styles';

export const FavoriteBody = ({
  navigation,
  FavoriteProducts,
  products,
  user,
  loadFavoriteProducts,
  isRefreshing,
}) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages['user.login.require']}</CustomText>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: AppColors.primary,
              borderRadius: 5,
              borderColor: AppColors.primary,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <CustomText style={{color: '#fff'}}>Tiếp tục</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : FavoriteProducts.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{fontSize: 16}}>
            Không có sản phẩm trong mục yêu thích
          </CustomText>
          <CustomText style={{fontSize: 16}}>
            Bắt đầu thêm sản phẩm nào !
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={FavoriteProducts}
          onRefresh={loadFavoriteProducts}
          refreshing={isRefreshing}
          keyExtractor={item => item.wishlistId}
          renderItem={({item}) => {
            const productDetails = products.find(
              p => p.productId === item.productId,
            );
            if (!productDetails) {
              return null;
            }
            return (
              <FavoriteItem
                navigation={navigation}
                item={{
                  ...item,
                  product: productDetails,
                }}
                products={products}
              />
            );
          }}
        />
      )}
    </>
  );
};

FavoriteBody.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  FavoriteProducts: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
