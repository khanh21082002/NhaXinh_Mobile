import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Field, reduxForm } from "redux-form";
import CustomText from "../../components/UI/CustomText";
import renderField from "./components/ResetRenderFileld";
//Colors
import Colors from "../../utils/Colors";
//Icon
import Icon from 'react-native-vector-icons/Feather';
//Redux
import { useDispatch, useSelector } from "react-redux";
// Action
import { ChangePassword } from "../../reducers";
import Loader from "../../components/Loaders/Loader";
// Thay thế expo-secure-store bằng AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppColors } from "../../styles";
import { Header } from "./components";

//Validation
const validate = (values) => {
  const errors = {};

  if (!values.newpassword) {
    errors.newpassword = "Mật khẩu không được bỏ trống";
  } else if (values.newpassword.length < 6) {
    errors.newpassword = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }

  if (!values.oldpassword) {
    errors.oldpassword = "Mật khẩu không được bỏ trống";
  } else if (values.oldpassword.length < 6) {
    errors.oldpassword = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }

  if (!values.confirmpassword) {
    errors.confirmpassword = "Mật khẩu không được bỏ trống";
  } else if (values.confirmpassword.length < 6) {
    errors.confirmpassword = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }

  if (values.confirmpassword !== values.newpassword) {
    errors.confirmpassword = "Mật khẩu xác nhận không trùng khớp";
  }

  return errors;
};

const resetForm = (props) => {
  const { handleSubmit, reset } = props;
  const dispatch = useDispatch();
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const loading = useSelector((state) => state.auth.isLoading);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const url = props.route.params;

  const submit = async (values) => {
    try {
      await dispatch(ChangePassword(values.oldpassword, values.newpassword));

      await AsyncStorage.removeItem('secretKey');

      Keyboard.dismiss();
      await reset();
      Alert.alert("Thông báo", "Thay đổi mật khẩu thành công!", [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.navigate("HomeTab");
          },
        },
      ]);
    } catch (err) {
      // alert(err);
      Alert.alert("Thông báo", err.message, [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Loader /> : <></>}
      <Header navigation={props.navigation} />
      <View style={styles.content}>
        <CustomText style={styles.title}>Bạn muốn đổi mật khẩu?</CustomText>
        <Field
          name="oldpassword"
          keyboardType="default"
          label="Mật Khẩu Cũ"
          component={renderField}
          secureTextEntry={!showOldPass ? true : false}
          placeholder="Mật khẩu cũ"
          icon="lock"
          passIcon="oldpass"
          showOldPass={showOldPass}
          setShowOldPass={setShowOldPass}
        />

        <Field
          name="newpassword"
          keyboardType="default"
          label="Mật Khẩu Mới"
          component={renderField}
          secureTextEntry={!showNewPass ? true : false}
          placeholder="Mật khẩu mới"
          icon="lock"
          passIcon="newpass"
          showNewPass={showNewPass}
          setShowNewPass={setShowNewPass}
        />
        <Field
          name="confirmpassword"
          keyboardType="default"
          label="Xác Nhận Mật Khẩu"
          component={renderField}
          secureTextEntry={!showConfirmPass ? true : false}
          placeholder="Xác nhận mật khẩu"
          passIcon="confirmpass"
          icon="lock"
          showConfirmPass={showConfirmPass}
          setshowConfirmPass={setshowConfirmPass}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: "center" }}
        >
          <View style={styles.signIn}>
            <CustomText style={styles.textSign}>Xác nhận</CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: "20%",
    height: 300,
    paddingHorizontal: 20,
  },
  title: {
    color: AppColors.primary,
    fontSize: 30,
    marginBottom: 10,
  },
  signIn: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: AppColors.primary,
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
  },
});

export const ResetPwScreen = reduxForm({
  form: "resetPw", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(resetForm);
