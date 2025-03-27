import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Action
import { fetchFavorite } from "../../reducers";
//Component
import { Header, FavoriteBody } from "./components";
import Colors from "../../utils/Colors";
//Loader
import SkeletonLoadingCart from "../../components/Loaders/SkeletonLoadingCart";

export const FavoriteScreen = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.fav.isLoading);
  const FavoriteProducts = useSelector((state) => state.fav.favoriteList);
   const products = useSelector(state => state.store.products);

  const dispatch = useDispatch();

  const loadFavoriteProducts = useCallback(async () => {
    if (Object.keys(user).length === 0) return;
    setIsRefreshing(true);
    try {
      await dispatch(fetchFavorite());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing , user]);
  useEffect(() => {
    loadFavoriteProducts();
  }, [user]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {loading ? (
        <SkeletonLoadingCart />
      ) : (
        <FavoriteBody
          user={user}
          FavoriteProducts={FavoriteProducts}
          products={products}
          navigation={navigation}
          loadFavoriteProducts={loadFavoriteProducts}
          isRefreshing={isRefreshing}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
