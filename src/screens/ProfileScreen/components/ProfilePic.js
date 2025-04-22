import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Text
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { _pickImage } from "../../../utils/Tools";  // Đảm bảo _pickImage được cài đặt chính xác
import CustomText from "../../../components/UI/CustomText";
import { SheetManager } from "react-native-actions-sheet";
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

export const ProfilePic = ({
  user,
  totalSpent,
  imageUri,
  setImageUri,
  setFilename,
  setType,
  setUploadButton,
  uploadButton,
  UploadProfile
}) => {

  const UploadProfileHandler = async () => {
    try {
      await SheetManager.show('profile-pic-options', {
        payload: {
          handler: async (buttonIndex) => {
            let pickerResult;
            if (buttonIndex === 0) {
              pickerResult = await _pickImage('camera');
            } else if (buttonIndex === 1) {
              pickerResult = await _pickImage('library');
            } 
            // Kiểm tra nếu có kết quả và không bị hủy bỏ
            if (pickerResult && pickerResult.assets && pickerResult.assets.length > 0 && !pickerResult.cancelled) {
              const localUri = pickerResult.assets[0].uri;
              const filename = localUri.split("/").pop();
              setImageUri(localUri);
              setFilename(filename);
              setType(pickerResult.assets[0].type);
              setUploadButton(true);
            }
          }
        },
      });
    } catch (error) {
      console.error("Lỗi khi mở ActionSheet:", error);
    }
  };
  
  const getMembershipLevel = (totalSpent) => {
    if (totalSpent >= 50000000) {
      return "Hạng Vàng";
    } else if (totalSpent >= 10000000) {
      return "Hạng Bạc";
    } else {
      return "Hạng Đồng";
    }
  };
  

  return (
    <View>
      <View style={{ height: 50, alignItems: "center" }}>
        <Image
          style={styles.profilePic}
          source={
            imageUri
              ? { uri: imageUri }
              : user.avatarUrl
              ? { uri: user.avatarUrl} 
              : require("../../../assets/images/defaultprofile.png") 
          }
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            transform: [{ translateY: -110 }, { translateX: -5 }],
          }}
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={UploadProfileHandler}>
              <FontAwesome name="camera" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
       
       {uploadButton && (
        <TouchableOpacity style={styles.uploadButton} onPress={UploadProfile}>
          <Text style={styles.uploadButtonText}>Tải lên</Text>
        </TouchableOpacity>
      )}
      <CustomText style={styles.userName}>{user.firstName + " " + user.lastName}</CustomText>
      <View style={styles.priceCard}>
        <Text style={styles.label}>Tổng chi tiêu</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>
            {totalSpent.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
          <Text style={styles.balanceType}> | {getMembershipLevel(totalSpent)}</Text>
        </View>
      </View>
    </View>
  );
};

ProfilePic.propTypes = {
  user: PropTypes.object.isRequired,
  imageUri: PropTypes.string.isRequired,
  setImageUri: PropTypes.func.isRequired,
  setFilename: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setUploadButton: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 120,
    height: 120,
    borderRadius: 60,
    transform: [{ translateY: -70 }],
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.primary,
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    color: AppColors.primary,
    textAlign: "center",
  },
  priceCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primary,
  },
  balanceType: {
    fontSize: 16,
    color: "#666",
  },
  uploadButton: {
    backgroundColor: AppColors.primary,
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProfilePic;
