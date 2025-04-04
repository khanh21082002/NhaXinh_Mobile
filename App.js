import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Text, StatusBar, View, Image, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './src/navigation';
import {reducer as formReducer} from 'redux-form';
import './src/utils/actionSheets';

// Reducers
import {
  authReducer,
  cartReducer,
  favoriteReducer,
  orderReducer,
  productReducer,
  categoryReducer,
  notificationReducer,
  materialReducer,

} from './src/reducers';
import LocalNotification from './src/components/Notification/LocalNotification';

// Redux store
const rootReducer = combineReducers({
  store: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  fav: favoriteReducer,
  category: categoryReducer,
  notification: notificationReducer,
  material: materialReducer,
  form: formReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

const LoadAssets = async () => {
  const imageAssets = [
    require('./src/assets/images/banner1.jpg'),
    require('./src/assets/images/banner3.jpg'),
    require('./src/assets/images/banner4.jpg'),
    require('./src/assets/images/banner5.jpg'),
    require('./src/assets/images/banner6.jpg'),
  ].map(img => Image.prefetch(Image.resolveAssetSource(img).uri)); // Chuyển mỗi ảnh thành một Promise

  return Promise.all([imageAssets]);
};

export default function App() {
  const [assetLoaded, setAssetLoaded] = useState(false);

  useEffect(() => {
    LoadAssets()
      .then(() => setAssetLoaded(true))
      .catch(err => console.warn(err));

    // LogBox.ignoreAllLogs(true);
  }, []);

  // if (!assetLoaded) {
  //   // Có thể thay thế màn hình Loading tùy chỉnh tại đây
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        {/* <LocalNotification /> */}
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
