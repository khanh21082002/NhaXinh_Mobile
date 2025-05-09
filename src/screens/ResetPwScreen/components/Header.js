import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity , Image } from "react-native";
//Color
import Colors from "../../../utils/Colors";
//Icon
// import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Text
import CustomText from "../../../components/UI/CustomText";
import { AppColors } from "../../../styles";

const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", bottom: 10, left: 15, zIndex: 10 }}>
        <TouchableOpacity onPress={() =>navigation.goBack()}>
        <Image
          source={require('../../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.title}> Đổi mật khẩu </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: "center",
    color: AppColors.primary,
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    paddingBottom: 5,
  },
});
