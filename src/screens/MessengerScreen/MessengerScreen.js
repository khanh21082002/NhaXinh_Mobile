import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
// Redux
import {useSelector, useDispatch} from 'react-redux';
// Action

// Components
import {Header} from './components';
import Colors from '../../utils/Colors';
// TalkJS
import * as TalkRn from '@talkjs/react-native';
import { API_URL_NHAXINH } from '../../utils/Config';

// Custom Text component if it exists in your project
const CustomText = ({style, children}) => {
  return <Text style={style}>{children}</Text>;
};

// Messages object if it exists in your project
const Messages = {
  'user.login.require': 'Vui lòng đăng nhập để trò chuyện',
};

const MessengerScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [talkLoaded, setTalkLoaded] = useState(false);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const chatboxRef = useRef(null);

  // Load data from Redux
  const loadData = useCallback(async () => {
    try {     
      const res = await fetch(`${API_URL_NHAXINH}/User/CurrentUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      setCurrentUser(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Tạo đối tượng người dùng hiện tại (current user) cho TalkJS
  const createCurrentUser = () => {
    if (!user || !currentUser || !currentUser.userId) {
      console.log('Invalid user or currentUser data');
      return null;
    }

    return {
      id: currentUser.userId,
      name: user.firstName + ' ' + user.lastName || 'Người dùng',
      email: user.email || '',
      photoUrl: user.avatarUrl || '',
      role: currentUser.role ,
    };
  };

  // Tạo đối tượng người nhận tin nhắn (cửa hàng)
  const createStoreUser = () => {
    return {
      id: '9', // ID cửa hàng
      name: 'Cửa hàng', // Tên cửa hàng
      email: 'store@example.com',
      photoUrl: 'https://via.placeholder.com/150',
      role: 'store',
    };
  };

  // Tạo cuộc trò chuyện
  const createConversation = talkSession => {
    if (!talkSession) return null;

    const currentUser = createCurrentUser();
    const storeUser = createStoreUser();

    if (!currentUser) return null;

    // Tạo cuộc trò chuyện giữa người dùng và cửa hàng
    const conversation = talkSession.getOrCreateConversation(
      TalkRn.oneOnOneId(currentUser.id, storeUser.id),
    );

    // Thiết lập tiêu đề và người tham gia
    conversation.setParticipant(currentUser);
    conversation.setParticipant(storeUser);

    return conversation;
  };

  console.log('currentUser', currentUser);
  console.log('user', user);
  


  // Render UI khi chưa đăng nhập
  const renderLoginRequired = () => (
    <View style={styles.center}>
      <CustomText style={{fontSize: 16}}>
        {Messages['user.login.require'] || 'Vui lòng đăng nhập để trò chuyện'}
      </CustomText>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <CustomText style={{fontSize: 16, color: '#fff'}}>
            Tiếp tục
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : Object.keys(user).length === 0 ? (
        renderLoginRequired()
      ) : (
        <TalkRn.Session
          appId="tqdOr8pF"
          me={createCurrentUser()}
          enablePushNotifications={true}
          onLoadingChange={loading => setTalkLoaded(!loading)}>
          {talkLoaded ? (
            <TalkRn.Chatbox
              ref={chatboxRef}
              conversationBuilder={talkSession =>
                createConversation(talkSession)
              }
              style={styles.chatbox}
              showChatHeader={true}
              onSendMessage={() => {
                console.log('Message sent');
              }}
            />
          ) : (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          )}
        </TalkRn.Session>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  chatbox: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    borderColor: Colors.primary,
    marginTop: 10,
  },
});

export default MessengerScreen;
