import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
//Redux
import { useDispatch } from "react-redux";
//Action
import { removeFromCart, addToCart, decCartQuantity } from "../../../reducers";
//Text
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import { CartItem } from "./CartItem";
import Messages from "../../../messages/user";
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

export const CartBody = ({
  navigation,
  user,
  carts,
  products,
  loadCarts,
  isRefreshing,
}) => {
  const dispatch = useDispatch();
  const onRemove = (itemId) => {
    Alert.alert("Bỏ giỏ hàng", "Bạn có chắc bỏ sản phẩm khỏi giỏ hàng?", [
      {
        text: "Hủy",
      },
      {
        text: "Đồng ý",
        onPress: () => {
          dispatch(removeFromCart(carts.id, itemId));
        },
      },
    ]);
  };
  return (
    <View style={styles.footer}>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages["user.login.require"]}</CustomText>
          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <CustomText style={{ color: "#fff" }}>Tiếp tục</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : carts.items?.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            Chưa có sản phẩm nào trong giỏ hàng
          </CustomText>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={carts.products}
            onRefresh={loadCarts}
            refreshing={isRefreshing}
            keyExtractor={(item) => item.productId.toString()}
            renderItem={({ item }) => {
              const productDetails = products.find(
                (p) => p.id === item.productId
              );
              if (!productDetails) return null;
              return (
                <CartItem
                  item={{
                    ...item,
                    product: productDetails,
                  }}
                  onRemove={() => onRemove(item.productId)}
                  onAdd={() => {
                    dispatch(addToCart(item, user.token));
                  }}
                  onDes={() => {
                    dispatch(decCartQuantity(carts.id, item.productId));
                  }}                
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

CartBody.propTypes = {
  user: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  loadCarts: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: AppColors.primary,
    borderRadius: 5,
    borderColor: AppColors.primary,
    marginTop: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
