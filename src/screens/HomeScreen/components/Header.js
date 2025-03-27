import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../utils/Colors";
import { AppColors } from "../../../styles";

const { width, height } = Dimensions.get("window");

export const Header = ({ user, navigation, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Animated values
  const scrollY = new Animated.Value(0);
  const headerPlatform = 50;

  const _headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerPlatform],
    outputRange: [0, -headerPlatform],
    extrapolate: "clamp",
  });

  const _headerOpacity = scrollY.interpolate({
    inputRange: [0, headerPlatform],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={{ ...styles.header_safe_area, ...style }}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: _headerTranslateY }],
            opacity: _headerOpacity,
          },
        ]}
      >
        <View style={styles.header_inner}>
          {/* Profile Section */}
          {Object.keys(user).length > 0 ? (
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={
                  user.avatarUrl && user.avatarUrl.length > 0
                    ? { uri: user.avatarUrl }
                    : require("../../../assets/images/defaultprofile.png")
                }
                style={styles.profileImage}
              />
              <Text style={styles.userName}>
                {user.firstName + " " + user.lastName}
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../../assets/images/defaultprofile.png")}
              style={styles.profileImage}
            />
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: Colors.white,
  },
  header: {
    position: "absolute",
    backgroundColor: Colors.white,
    width,
    height: 50,
    top: 10,
  },
  header_inner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    resizeMode: "cover",
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primary,
  },
});

export default Header;
