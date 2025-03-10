import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image
} from "react-native";
import Colors from "../../../utils/Colors";
//Text
import CustomText from "../../../components/UI/CustomText";
//Steps
import OrderSteps from "../../../components/UI/OrderSteps";
import Ionicons from 'react-native-vector-icons/Ionicons';
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

const { width, height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.innerHeader}>
        <View
          style={{ position: "absolute", bottom: 20, left: 15, zIndex: 10 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
          source={require('../../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
          </TouchableOpacity>
        </View>
        <View style={styles.orderStepsContainer}>
          <CustomText style={styles.title}> Phương Thức Thanh Toán </CustomText>
          <View style={styles.orderSteps}>
            <OrderSteps position={2} />
          </View>
        </View>
        <View />
      </View>
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: "#fff",
    height: Platform.OS === "android" ? 100 : height > 667 ? 115 : 100,
  },
  innerHeader: {
    height: "96%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: "center",
    color: AppColors.primary,
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  orderStepsContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  orderSteps: {
    width: (width * 50) / 100,
    marginVertical: 5,
  },
});
