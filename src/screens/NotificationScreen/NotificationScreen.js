import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
//Redux
import {useSelector, useDispatch} from 'react-redux';
//Action

//component
import Colors from '../../utils/Colors';
import {Header} from './components';
import NotificationItem from './components/NotificationItem';
import {MessageIcon, ShippingIcon} from './components/Icons';
//Loader
//Loader
import SkeletonLoadingCart from '../../components/Loaders/SkeletonLoadingCart';
import NotificationBody from './components/NotificationBody';
import {fetchNotification} from '../../reducers';

const {height} = Dimensions.get('window');

export const NotificationScreen = ({navigation}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.notification.isLoading);
  const notifications = useSelector(state => state.notification.notifications);
  const dispatch = useDispatch();

  const loadNotification = useCallback(async () => {
    if (Object.keys(user).length === 0) return;
    setIsRefreshing(true);
    setIsRefreshing(true);
    try {
      await dispatch(fetchNotification());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);
  useEffect(() => {
    loadNotification();
  }, []);

  const notificationSort = notifications.sort((a, b) => {
    const dateA = new Date(a.createdDate).getTime();
    const dateB = new Date(b.createdDate).getTime();
    return dateB - dateA;
  });

  console.log(notifications);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {loading ? (
        <SkeletonLoadingCart />
      ) : (
        <NotificationBody
          user={user}
          notificationSection={notificationSort}
          navigation={navigation}
          loadNotification={loadNotification}
          isRefreshing={isRefreshing}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
  },
});

export default NotificationScreen;
