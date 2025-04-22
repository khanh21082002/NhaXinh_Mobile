import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../utils/Colors';
import {fetchUser} from '../../reducers/user/userActions';

const ChatListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [chatUsers, setChatUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector(state => state.auth.user);
  const employees = useSelector(state => state.employ.users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (employees.length > 0) {
      setChatUsers(employees);
      setFilteredUsers(employees);
      setLoading(false);
    }
  }, [employees]);

  console.log(employees);
  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === '') {
      setFilteredUsers(chatUsers);
    } else {
      const filtered = chatUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, chatUsers]);

  const handleUserSelect = selectedUser => {
    const me = {
      id: user.userId,
      name: user.firstName + ' ' + user.lastName || 'Người dùng',
      email: user.email || '',
      photoUrl: user.avatarUrl || null,
      role: user.role,
    };

    const other = {
      id: selectedUser.userId,
      name:selectedUser.firstName + ' ' + selectedUser.lastName || 'Người dùng',
      email: selectedUser.email || '',
      photoUrl: selectedUser.avatarUrl || null,
    };
    navigation.navigate('Messenger', {me, other});
  };

  const renderChatItem = ({item}) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleUserSelect(item)}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            item.avatarUrl
              ? {uri: item.avatarUrl}
              : require('../../assets/images/imgprofile.jpg')
          }
          style={styles.avatar}
        />
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.nameTimeContainer}>
          <Text style={styles.userName}>
            {item.firstName + ' ' + item.lastName}
          </Text>
          <Text style={styles.timeText}>{item.lastMessageTime}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {filteredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'Không tìm thấy người dùng nào'
              : 'Bạn chưa có cuộc trò chuyện nào'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderChatItem}
          keyExtractor={item => item.userId}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInput: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  listContainer: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1E1E1',
  },
  unreadBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default ChatListScreen;
