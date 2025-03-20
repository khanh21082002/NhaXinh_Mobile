import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "./components";
import { AppColors } from "../../styles";

const BankAccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bankName, bankId, bankIcon } = route.params;

  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = () => {
    // Kiểm tra thông tin đầu vào
    if (!accountNumber.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập số tài khoản");
      return;
    }
    if (!accountHolder.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập tên chủ tài khoản");
      return;
    }
    if (!identityNumber.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập số CMND/CCCD");
      return;
    }
    if (!isAgreed) {
      Alert.alert("Thông báo", "Vui lòng xác nhận đồng ý với điều khoản và điều kiện");
      return;
    }

    // Tiếp tục xử lý và chuyển màn hình
    navigation.navigate("BankCard", {
      bankName,
      bankId,
      accountNumber,
      accountHolder
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
         <Header navigation={navigation} title="Liên kết ngân hàng" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Image source={{ uri: bankIcon }} style={styles.bankLogo} />
            <Text style={styles.bankName}>{bankName}</Text>
          </View>

          <Text style={styles.sectionTitle}>Thông tin tài ngân hàng</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Số thẻ/tài khoản</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: 123456789XX"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Chủ thẻ/tài khoản</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: NGUYEN VAN A"
              value={accountHolder}
              onChangeText={setAccountHolder}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CMND/CCCD</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: 1234XXXX"
              value={identityNumber}
              onChangeText={setIdentityNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setIsAgreed(!isAgreed)}
            >
              {isAgreed ? (
                <View style={styles.checkedBox}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              ) : (
                <View style={styles.uncheckedBox} />
              )}
            </TouchableOpacity>

            <Text style={styles.checkboxLabel}>
              Tôi xác nhận đã đọc, hiểu và đồng ý với{" "}
              <Text style={styles.linkText}>Điều khoản và điều kiện sử dụng dịch vụ liên kết Ví</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, (!isAgreed || !accountNumber || !accountHolder || !identityNumber) && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isAgreed || !accountNumber || !accountHolder || !identityNumber}
          >
            <Text style={styles.submitButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  bankLogo: {
    width: 60,
    height: 60,
    marginRight:4,
    resizeMode: "contain",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 16,
  },
  checkbox: {
    marginRight: 8,
    marginTop: 3,
  },
  uncheckedBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  checkedBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  linkText: {
    color: AppColors.primary,
    textDecorationLine: "none",
  },
  submitButton: {
    backgroundColor:  AppColors.primary,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 16,
  },
  disabledButton: {
    backgroundColor: "#f0f0f0",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BankAccountScreen;