import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "./components";

const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  const paymentMethods = [
    {
      id: "momo",
      name: "Momo",
      icon: require("../../assets/images/momo-icon.png"), // Đường dẫn đến icon Momo
      color: "#b0006d"
    },
    {
      id: "vnpay",
      name: "Ví VNPAY",
      icon: require("../../assets/images/vnpay-icon.png"), // Đường dẫn đến icon VNPAY
      color: "#005baa"
    },
    {
      id: "zalopay",
      name: "Zalopay",
      icon: require("../../assets/images/zalopay-icon.png"), // Đường dẫn đến icon ZaloPay
      color: "#0068ff"
    },
    {
      id: "atmCard",
      name: "Thẻ ATM (Thẻ nội địa)",
      icon: require("../../assets/images/atm-icon.png"), // Đường dẫn đến icon ATM
      color: "#2a5caa"
    },
  ];

  const handleSelectPaymentMethod = (methodId) => {
    if (methodId === "atmCard") {
      navigation.navigate("BankList");
    } else {
      // Xử lý cho các phương thức thanh toán khác như Momo, VNPAY, ZaloPay
      navigation.navigate("Success", { paymentMethod: methodId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Phương thức thanh toán" />
      
      <View style={{ paddingHorizontal: 16 }}>
      <Text style={styles.header}>
        Lựa chọn phương thức thanh toán phù hợp với bạn.
      </Text>
      
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={styles.methodItem}
          onPress={() => handleSelectPaymentMethod(method.id)}
        >
          <View style={styles.methodInfo}>
            <Image source={method.icon} style={styles.methodIcon} />
            <Text style={styles.methodName}>{method.name}</Text>
          </View>
          <View style={styles.chevron}>
            <Text style={styles.chevronText}>{">"}</Text>
          </View>
        </TouchableOpacity>
      ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 16,
    marginVertical: 16,
    color: "#333",
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  methodInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodIcon: {
    width: 48,
    height:48,
    marginRight: 16,
    resizeMode: "contain",
  },
  methodName: {
    fontSize: 16,
    color: "#333",
  },
  chevron: {
    paddingRight: 8,
  },
  chevronText: {
    fontSize: 18,
    color: "#999",
  },
});

export default PaymentMethodScreen;