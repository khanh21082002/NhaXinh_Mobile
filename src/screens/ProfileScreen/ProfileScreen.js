import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert, TouchableOpacity, Text } from "react-native";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions
import { UploadProfilePic } from "../../reducers";
import { EditButton, ProfilePic, ProfileBody } from "./components";
// Import SheetManager từ react-native-actions-sheet
import { SheetProvider } from "react-native-actions-sheet";
// Loader
import Loader from "../../components/Loaders/Loader";

const { width, height } = Dimensions.get("window");

export const ProfileScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading);
  const [imageUri, setImageUri] = useState("");
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [uploadButton, setUploadButton] = useState(false);

  const dispatch = useDispatch();
  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const UploadProfile = async () => {
    try {
      await dispatch(UploadProfilePic(imageUri, filename, type));
      setUploadButton(false);
      if (unmounted.current) {
        Alert.alert("Thông báo", "Cập nhật ảnh đại diện thành công", [{ text: "OK" }]);
      };
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SheetProvider context="global">
      <View style={styles.container}>
        <View style={styles.header}></View>
        {loading && <Loader />}
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            <ProfilePic
              user={user}
              imageUri={imageUri}
              setImageUri={setImageUri}
              setType={setType}
              setFilename={setFilename}
              setUploadButton={setUploadButton}
              uploadButton={uploadButton}
              UploadProfile={UploadProfile}
            />
            <ProfileBody user={user} />
          </View>
        </View>
       
      </View>
    </SheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    flexDirection: "row",
    height: 0.15 * height,
    justifyContent: "center",
  },
  profileContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width,
    height,
    alignItems: "center",
  },
});

export default ProfileScreen;
