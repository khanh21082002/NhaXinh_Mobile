import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";

class PreOrderItem extends React.PureComponent {
  render() {
    const { item, quantity } = this.props;
    const total = quantity * item.price; // Tính tổng giá trị đơn hàng

    return (
      <View style={styles.container}>
        {/* Hình ảnh sản phẩm */}
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={
              item.images && item.images.length > 0
                ? { uri: item.images.find(image => image.isPrimary)?.imageUrl }
                : require("../../../assets/images/default-error-image.png")
            }
          />
        </View>

        {/* Thông tin sản phẩm */}
        <View style={styles.right}>
          <CustomText style={styles.title}>{item.name}</CustomText>
          <View style={styles.priceContainer}>
            <CustomText style={styles.quantity}>SL: x {quantity}</CustomText>
            <CustomText style={styles.price}>{total.toLocaleString()} đ</CustomText>
          </View>
        </View>
      </View>
    );
  }
}

PreOrderItem.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired, // Thêm prop số lượng sản phẩm
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  left: {
    width: "20%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
    borderRadius: 5,
  },
  right: {
    width: "80%",
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 13,
    color: Colors.text,
  },
  price: {
    fontSize: 13,
    color: Colors.red,
  },
});

export default PreOrderItem;
