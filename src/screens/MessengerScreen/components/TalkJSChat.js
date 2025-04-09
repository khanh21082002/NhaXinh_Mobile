import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as TalkRn from '@talkjs/react-native';
import { AppColors } from '../../../styles';

// Import message component for missing package fallback
import CustomText from "../../../components/UI/CustomText";

const TalkJSChat = ({ 
  currentUser, 
  otherUser, 
  appId, 
  onNavigateToLogin,
  chatboxOptions = {}
}) => {
  const [talkLoaded, setTalkLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize TalkJS
    try {
      TalkRn.Session.loadJS();
    } catch (err) {
      setError('Không thể tải TalkJS. Vui lòng thử lại sau.');
      console.error('TalkJS loading error:', err);
    }
  }, []);

  // Create or get conversation between users
  const createConversation = (talkSession) => {
    if (!talkSession || !currentUser || !otherUser) return null;

    // Create a unique conversation ID for the two users
    const conversationId = TalkRn.oneOnOneId(currentUser.id, otherUser.id);
    
    // Get or create conversation
    const conversation = talkSession.getOrCreateConversation(conversationId);
    
    // Set participants
    conversation.setParticipant(currentUser);
    conversation.setParticipant(otherUser);
    
    // Optional: Set custom conversation data
    conversation.setAttributes({
      subject: `Trò chuyện với ${otherUser.name}`,
      photoUrl: otherUser.photoUrl,
      custom: {
        createdAt: new Date().toISOString(),
      }
    });

    return conversation;
  };

  // If no current user, show login prompt
  if (!currentUser) {
    return (
      <View style={styles.center}>
        <CustomText style={styles.message}>
          Vui lòng đăng nhập để trò chuyện
        </CustomText>
        <TouchableOpacity 
          style={styles.button}
          onPress={onNavigateToLogin}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show error if any
  if (error) {
    return (
      <View style={styles.center}>
        <CustomText style={styles.errorMessage}>{error}</CustomText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => window.location.reload()}
        >
          <Text style={styles.buttonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TalkRn.Session
        appId={appId}
        me={currentUser}
        enablePushNotifications={true}
        onLoadingChange={(loading) => setTalkLoaded(!loading)}
      >
        {talkLoaded ? (
          <TalkRn.Chatbox
            conversationBuilder={(talkSession) => createConversation(talkSession)}
            style={styles.chatbox}
            {...chatboxOptions}
          />
        ) : (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={AppColors.primary} />
            <CustomText style={styles.loadingText}>Đang tải trò chuyện...</CustomText>
          </View>
        )}
      </TalkRn.Session>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatbox: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TalkJSChat;