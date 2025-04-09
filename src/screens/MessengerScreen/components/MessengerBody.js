import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// Components
import CustomText from "../../../components/UI/CustomText";
import Messages from "../../../messages/user";
import MessengerItem from "../components/MessengerItem";
import MessengerBox from "../components/MessengerBox";

import { AppColors } from "../../../styles";

const MessengerBody = ({ messages, user, navigation, handleSendMessage }) => {
  const flatListRef = useRef(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Hiển thị trạng thái kết nối
  const renderConnectionStatus = () => {
    if (Object.keys(user).length === 0) return null;
    
    return (
      <View style={styles.statusBar}>
        <View style={styles.statusIndicator} />
        <CustomText style={styles.statusText}>Đang hoạt động</CustomText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderConnectionStatus()}
      
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            {Messages["user.login.require"]}
          </CustomText>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <CustomText style={{ fontSize: 16, color: "#fff" }}>
                Tiếp tục
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          {messages.length === 0 ? (
            <View style={styles.center}>
              <ActivityIndicator size="small" color={AppColors.primary} />
              <CustomText style={styles.emptyText}>Đang tải tin nhắn...</CustomText>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MessengerItem item={item} />}
              contentContainerStyle={styles.listContent}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
            />
          )}
        </View>
      )}

      {/* MessengerBox luôn nằm ở cuối */}
      {Object.keys(user).length !== 0 && <MessengerBox onSend={handleSendMessage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  messageContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: AppColors.primary,
    borderRadius: 5,
    borderColor: AppColors.primary,
    marginTop: 10,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  emptyText: {
    marginTop: 10,
    color: AppColors.gray,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: AppColors.lightGray,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: AppColors.darkGray,
  }
});

export default MessengerBody;