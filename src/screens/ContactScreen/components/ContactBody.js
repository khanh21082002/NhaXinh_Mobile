import React from "react";
import { View, StyleSheet } from "react-native";
//Text
import CustomText from "../../../components/UI/CustomText";
import { TextIcon } from "./TextIcon";

export const ContactBody = () => {
  return (
    <View style={styles.footer}>
      <CustomText style={styles.title}>contact us</CustomText>
      <View style={styles.info}>
        <TextIcon
          icon={require("../../../components/IconAnimation/location.json")}
          text='Location : Hà Nội, Việt Nam'
          url='https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+T%C3%A2y+Nam/@20.0000004,105.0000003,12z/data=!3m1!4b1!4m5!3m4!1s0x3135ab6a5c8b3b0f:0x1e2d6a7d9b5f1e1!8m2!3d20.0000004!4d105.0000003'
        
        />
        <TextIcon
          icon={require("../../../components/IconAnimation/email3.json")}
          text='Email : furnitureshop.nhaxinh@gmail.com '
          url='mailto: furnitureshop.nhaxinh@gmail.com '
        />
        <TextIcon
          icon={require("../../../components/IconAnimation/phone2.json")}
          text='Phone : 19008198'
          url='tel: 19008198'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: -20,
  },
  info: {
    marginTop: 20,
  },
});
