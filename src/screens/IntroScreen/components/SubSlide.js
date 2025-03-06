import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../utils/Colors";
import {AppColors} from "../../../styles";
import CustomText from "../../../components/UI/CustomText";

export const SubSlide = ({ last, NextSlide, EnterApp }) => {
  const bgColor = last ? AppColors.primary : AppColors.primaryLight;
  const labelCover = last ? "#ffffff" : Colors.text;
  const onPressHandler = last ? EnterApp : NextSlide;
  return (
    <View style={styles.subSlideContainer}>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={[styles.buttonContainer, { backgroundColor: bgColor }]}>
          <Text style={[styles.buttonLabel, { color: labelCover }]}>
            {last ? "Vào Trang Chủ" : "Tiếp tục"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subSlideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  subTitle: {
    fontSize: 24,
    color: Colors.text,
  },
  des: {
    fontSize: 18,
    lineHeight: 30,
    color: Colors.text,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 15,
    height: 50,
    width: 280,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
