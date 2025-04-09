import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../../styles';

const MessengerBox = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleChangeText = (text) => {
    setMessage(text);
    setIsTyping(text.length > 0);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color={AppColors.primary} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            value={message}
            onChangeText={handleChangeText}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            style={[styles.sendButton, isTyping ? styles.sendButtonActive : null]}
            onPress={handleSend}
            disabled={!isTyping}
          >
            <Ionicons
              name="send"
              size={24}
              color={isTyping ? AppColors.white : AppColors.lightGray}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: AppColors.lightGray,
    backgroundColor: AppColors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: AppColors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    backgroundColor: AppColors.lightGray + '30', // Adding transparency
  },
  attachButton: {
    padding: 5,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: AppColors.primary,
  },
});

export default MessengerBox;