import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
//Color
import Colors from '../../utils/Colors';
//Redux
import { useSelector } from 'react-redux';
//Components
import Snackbar from '../../components/Notification/Snackbar';
import {
  Header,
  DetailBody,
  ActionButton,
  Comments,
} from './components';
import { colorCheck } from '../../utils/Tools';
import { AppColors } from '../../styles';
import ModalComp from './components/ModalComp';

export const DetailScreen = (props) => {
  const scrollY = new Animated.Value(0);
  const user = useSelector((state) => state.auth.user);
  const { item } = props.route.params;
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [color, setColor] = useState(AppColors.primary);
  const [modalVisible, setModalVisible] = useState(false);

  //Favorite
  const wishlist = useSelector((state) => state.fav.favoriteList);
  const isFavorite = wishlist.some((product) => product.productId === item.productId);

  const FavoriteProducts = useSelector((state) => state.fav.favoriteList);
  const wishlistId = FavoriteProducts.find((p) => p.productId === item.productId)?.wishlistId;

  
  useEffect(() => {
    const checkColor = async () => {
      const getColor = await colorCheck(item.color);
      setColor(getColor);
    };
    checkColor();
  }, [item]);

  return (
    <View style={styles.container}>
      {showSnackbar && <Snackbar checkVisible={showSnackbar} message={message} />}
          <FlatList
            data={[{}]} // Chỉ để kích hoạt danh sách
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={
              <>
                <Header navigation={props.navigation} scrollY={scrollY} item={item} />
                <DetailBody item={item} color={color} />
              </>
            }
            ListFooterComponent={<Comments item={item} />}
            showsVerticalScrollIndicator={false}
          />

          <ActionButton
            item={item}
            wishlistId={wishlistId}
            FavoriteProducts={isFavorite}
            setShowSnackbar={setShowSnackbar}
            setModalVisible={setModalVisible}
            setMessage={setMessage}
            user={user}
            color={color}
          />

          <ModalComp
            item={item}
            color={color}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={props.navigation}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 20 },
});

export default DetailScreen;
