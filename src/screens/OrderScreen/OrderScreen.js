import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Action
import { fetchOrder } from "../../reducers";
import { Header, OrderBody } from "./components";
import SkeletonLoadingCart from "../../components/Loaders/SkeletonLoadingCart";

const { height } = Dimensions.get("window");

export const OrderScreen = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
 const products = useSelector(state => state.store.products);
  const dispatch = useDispatch();
  const loadOrders = useCallback(async () => {
    if (Object.keys(user).length === 0) return;
    setIsRefreshing(true);
    try {
      await dispatch(fetchOrder());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing , user]);
  useEffect(() => {
    loadOrders();
  }, [user]);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log("orders", orders);

  return (
    <View style={styles.container}>
      {/* <Header navigation={navigation} /> */}
      {orders.isLoading ? (
        <View style={styles.centerLoader}>
          <SkeletonLoadingCart />
        </View>
      ) : (
        <OrderBody
          user={user}
          orders={sortedOrders}
          products={products}
          isRefreshing={isRefreshing}
          loadOrders={loadOrders}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerLoader: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
  },
});
