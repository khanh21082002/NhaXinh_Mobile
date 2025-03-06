import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { FAB } from 'react-native-paper';
import { AppColors } from '../../../styles';
import { GEMINI_API_KEY } from '../../../utils/Config';

export const FloatButton = () => {
  const [state, setState] = useState({ open: false });
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '0',
      text: 'Xin chào! Tôi là trợ lý AI. Bạn cần giúp gì?',
      sender: 'ai'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const handleAIChat = () => {
    setIsChatModalVisible(true);
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
  
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: messages.map(msg => ({
                  text: msg.text
                })).concat({ text: inputText })
              }
            ]
          })
        }
      );
  
      if (!response.ok) {
        throw new Error(`Google Gemini API Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data || !data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Google Gemini API');
      }
  
      const aiResponse = {
        id: Date.now().toString(),
        text: data.candidates[0].content.parts[0].text.trim(),
        sender: 'ai'
      };
  
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error calling Gemini API:', error.message);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
        sender: 'ai'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <>
      <FAB.Group
        open={open}
        icon={open ? 'send' : 'robot-excited'}
        color='#fff'
        fabStyle={{
          backgroundColor: AppColors.primary,
          bottom: 10,
        }}
        actions={[
          {
            icon: 'robot-excited',
            label: 'AI Chat',
            onPress: handleAIChat,
          },
        ]}
        onStateChange={onStateChange}
      />

      <Modal
        visible={isChatModalVisible}
        animationType="slide"
        onRequestClose={() => setIsChatModalVisible(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsChatModalVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>AI Chat</Text>
          </View>
          
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messageList}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Nhập tin nhắn..."
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.sendButtonText}>Gửi</Text>}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    color: AppColors.primary,
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: AppColors.primary,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
  },
});