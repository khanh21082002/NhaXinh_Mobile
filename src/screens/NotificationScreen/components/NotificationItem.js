import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from 'moment';
moment.locale('vi');
const NotificationItem = ({ item, onPress }) => {
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {item.isRead && <View style={styles.unreadDot} />}
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={ require('../../../assets/images/logo.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        {item.message && (
          <Text style={styles.description} numberOfLines={2}>{item.message}</Text>
        )}
        <Text style={styles.time}>
          {moment(item.createdDate).add(7, 'hours').format('Do MMMM YYYY, hh:mm a')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    position: 'relative',
  },
  icon: {
    width: 40,
    height: 40,
  },
  unreadDot: {
    position: 'absolute',
    top: '50%',
    left: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFA726',
    marginTop: -3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default NotificationItem;