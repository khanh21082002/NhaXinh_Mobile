import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from "../../../styles";

export default renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  passIcon,
  showOldPass,
  showNewPass,
  setShowOldPass,
  setShowNewPass,
  showConfirmPass,
  setshowConfirmPass,
  autoCapitalize,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={AppColors.primary}
        style={{
          position: "absolute",
          top: 23,
          left: 18,
          zIndex: 10,
        }}
      />
      <TextInput
        label={label}
        autoCapitalize={autoCapitalize ? "words" : "none"}
        clearButtonMode={passIcon ? "never" : "always"}
        mode="outlined"
        selectionColor={AppColors.primary}
        theme={{
          roundness: 10,
          colors: { primary: AppColors.primary }
        }}
        left={
          <TextInput.Icon
            name={icon}
            size={24}
            color={AppColors.primary}
            style={{ paddingRight: 10 }}
          />
        }
        style={{
          fontSize: 12,
          backgroundColor: AppColors.blackLight,
          marginVertical: 5,
        }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        {...restInput}
      />
      {passIcon === "oldpass" ? (
        <MaterialCommunityIcons
          onPress={() => {
            setShowOldPass((prev) => !prev);
          }}
          name={showOldPass ? "eye" : "eye-off"}
          size={24}
          color={AppColors.primary}
          style={{
            position: "absolute",
            top: "35%",
            right: 10,
            zIndex: 100,
          }}
        />
      ) : passIcon === "newpass" ? (
        <MaterialCommunityIcons
          onPress={() => {
            setShowNewPass((prev) => !prev);
          }}
          name={showNewPass ? "eye" : "eye-off"}
          size={24}
          color={AppColors.primary}
          style={{
            position: "absolute",
            top: "35%",
            right: 10,
            zIndex: 100,
          }}
        />
      ) : passIcon === "confirmpass" ? (
        <MaterialCommunityIcons
          onPress={() => {
            setshowConfirmPass((prev) => !prev);
          }}
          name={showConfirmPass ? "eye" : "eye-off"}
          size={24}
          color={AppColors.primary}
          style={{
            position: "absolute",
            top: "35%",
            right: 10,
            zIndex: 100,
          }}
        />
      ) : (
        <></>
      )}

      {touched && error && (
        <CustomText style={{ color: "red", marginHorizontal: 15 }}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
