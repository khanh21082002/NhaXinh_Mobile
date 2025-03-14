import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// Icon
//import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// Color
import Colors from '../utils/Colors';
// Custom Drawer
import CustomDrawer from './CustomDrawer';
import CustomText from '../components/UI/CustomText';
// Auth Screens
import { AuthScreen } from '../screens/AuthScreen';
import { IntroScreen } from '../screens/IntroScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OTPScreen } from '../screens/OTPScreen';
import { TouchIdScreen } from '../screens/TouchIdScreen';
// Reset Screens
import { ForgetPwScreen } from '../screens/ForgetPasswordScreen';
import { ResetPwScreen } from '../screens/ResetPwScreen';
import { FinishResetPwScreen } from '../screens/FinishResetPwScreen';
// Home Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ContactScreen } from '../screens/ContactScreen';
//Product Screens
import { CartScreen } from '../screens/CartScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { FavoriteScreen } from '../screens/FavoriteScreen';
import { ProductScreen } from '../screens/ProductScreen';
// Order Screens
import { OrderScreen } from '../screens/OrderScreen';
import { PreOrderScreen } from '../screens/PreOrderScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { AddCreditCardScreen } from '../screens/PaymentScreen';
import { FinishOrderScreen } from '../screens/FinishOrderScreen';
// Profile Screens
import { ProfileScreen } from '../screens/ProfileScreen';
import { EditProfileScreen } from '../screens/ProfileScreen';
import { PersonalInfoScreen } from '../screens/PersonalInfo/PersonalInfoScreen';
import { SettingScreen } from '../screens/SettingScreen';

//Notification Screens
import { NotificationScreen } from '../screens/NotificationScreen';

//Terms Screens
import { TermsOfUseScreen } from '../screens/TermsOfUseScreen';

// redux
import { useSelector } from 'react-redux';
import { AppColors } from '../styles';

import MessengerScreen from '../screens/MessengerScreen/MessengerScreen';
import PaymentMethodScreen from '../screens/BankScreen/PaymentMethodScreen';
import BankListScreen from '../screens/BankScreen/BankListScreen';
import BankAccountScreen from '../screens/BankScreen/BankAccountScreen';
import BankCardScreen from '../screens/BankScreen/BankCardScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import PaymentPolicyScreen from '../screens/PaymentPolicyScreen/PaymentPolicyScreen';




// create Navigator

const IntroStack = createStackNavigator();
export const IntroStackScreen = () => (
  <IntroStack.Navigator>
    <IntroStack.Screen
      name="IntroScreen"
      component={IntroScreen}
      options={{ headerShown: false }}
    />
  </IntroStack.Navigator>
);

const LoginStack = createStackNavigator();
export const LoginStackScreen = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}
    mode="modal"
  >
    <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    <LoginStack.Screen name="ForgetPwScreen" component={ForgetPwScreen} />
  </LoginStack.Navigator>
);

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
    <AuthStack.Screen name="LoginScreen" component={LoginStackScreen} />
    <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    <AuthStack.Screen name="OTPScreen" component={OTPScreen} />
    <AuthStack.Screen name="FinishResetScreen" component={FinishResetPwScreen} />
  </AuthStack.Navigator>
);

const FavoriteStack = createStackNavigator();
export const FavoriteStackScreen = () => (
  <FavoriteStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <FavoriteStack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    <FavoriteStack.Screen name="Detail" component={DetailScreen} />
  </FavoriteStack.Navigator>
);

const PaymentStack = createStackNavigator();
export const PaymentStackScreen = () => (
  <PaymentStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}
  >
    <PaymentStack.Screen name="PaymentScreen" component={PaymentScreen} />
    <PaymentStack.Screen name="AddCreditCardScreen" component={AddCreditCardScreen} />
  </PaymentStack.Navigator>
);

const CartStack = createStackNavigator();
export const CartStackScreen = () => (
  <CartStack.Navigator screenOptions={{ headerShown: false }}>
    <CartStack.Screen name="CartScreen" component={CartScreen} />
    <CartStack.Screen name="PreOrderScreen" component={PreOrderScreen} />
    <CartStack.Screen name="Payment" component={PaymentStackScreen} />
    <CartStack.Screen name="AddCreditCardScreen" component={AddCreditCardScreen} />
  </CartStack.Navigator>
);

const NotificationStack = createStackNavigator();
export const NotificationStackScreen = () => (
  <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
    <NotificationStack.Screen name="NotificationScreen" component={NotificationScreen} />
  </NotificationStack.Navigator>
);

const ProductStack = createStackNavigator();
export const ProductStackScreen = () => (
  <ProductStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <ProductStack.Screen name="ProductScreen" component={ProductScreen} />
    <ProductStack.Screen name="DetailScreen" component={DetailScreen} />
    <ProductStack.Screen name="CartScreen" component={CartScreen} />
    
  </ProductStack.Navigator>
);

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
    // mode="modal"
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="ProfileEdit" component={EditProfileScreen} />
    <ProfileStack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    <ProfileStack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
    <ProductStack.Screen name="Setting" component={SettingScreen} />
    <ProductStack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
    <ProductStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <ProductStack.Screen name="PaymentPolicy" component={PaymentPolicyScreen} />
    <ProductStack.Screen name="ResetPw" component={ResetPwScreen} />
  </ProfileStack.Navigator>
);

const MessengerStack = createStackNavigator();
export const MessengerStackScreen = () => (
  <MessengerStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
    // mode="modal"
  >
    <MessengerStack.Screen name="Messenger" component={MessengerScreen} />
  </MessengerStack.Navigator>
);

const BankStack = createStackNavigator();
export const BankStackScreen = () => (
  <BankStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
    // mode="modal"
  >
    <BankStack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
    <BankStack.Screen name="BankList" component={BankListScreen} />
    <BankStack.Screen name="BankAccount" component={BankAccountScreen} />
    <BankStack.Screen name="BankCard" component={BankCardScreen} />

  </BankStack.Navigator>
);




const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
    //animationEnabled: false , nằm trong option
    />
    <HomeStack.Screen name="Detail" component={DetailScreen} />
    <HomeStack.Screen name="Cart" component={CartStackScreen} />
    <HomeStack.Screen name="Product" component={ProductStackScreen} />
    <HomeStack.Screen name="FinishOrder" component={FinishOrderScreen} />
    {/* <HomeStack.Screen name="AR" component={ARScreen} options={{ tabBarStyle: { display: 'none' } }}  /> */}
    <HomeStack.Screen name="ResetPw" component={ResetPwScreen} />
  </HomeStack.Navigator>
);

//Tab
const Tab = createMaterialBottomTabNavigator();

export const TabScreen = () => {
  const carts = useSelector((state) => state.cart.cartItems);
  console.log("Carts:", carts);
  console.log("Carts.items:", carts?.products);
  console.log("Carts.items.length:", carts?.products?.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          const color = focused ? AppColors.primary : Colors.grey;
          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'Favorite') {
            iconName = 'hearto';
          } else if (route.name === 'Cart') {
            iconName = 'shoppingcart';
          } else if (route.name === 'Notification') {
            iconName = 'notification';
          }

          return <AntDesign name={iconName} size={23} color={color} />;
        },
      })}
      barStyle={{
        backgroundColor: Colors.light_grey,
        height: 75,
        justifyContent: 'center',
      }}
      activeColor={AppColors.primary}
      inactiveColor={Colors.grey}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackScreen}
        options={() => ({
          tabBarLabel: 'Yêu thích',
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={() => ({
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: carts.products?.length === 0 ? null : carts.products?.length,
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStackScreen}
        options={() => ({
          tabBarLabel: 'Thông báo',
        })}
      />
    </Tab.Navigator>
  );
};

//Drawer
const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const drawers = [
    {
      name: 'HomeTab',
      screen: TabScreen,
      label: 'Trang Chủ',
      icon: 'home-outline',
    },
    {
      name: 'Order',
      screen: OrderScreen,
      label: 'Đơn Hàng',
      icon: 'receipt',
    },
    {
      name: 'Contact',
      screen: ContactScreen,
      label: 'Liên Hệ',
      icon: 'contacts',
    },
    {
      name: 'Tin nhắn',
      screen: MessengerScreen,
      label: 'Tin nhắn',
      icon: 'message',
    },
  ];

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.grey,
        itemStyle: { marginVertical: 3 },
      }}
    >
      {drawers.map(({ name, icon, label, screen }) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={screen}
          options={() => ({
            title: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: focused ? AppColors.primary : Colors.grey,
                  fontFamily: 'Roboto-Medium',
                }}
              >
                {label}
              </CustomText>
            ),
            drawerIcon: ({ focused }) => (
              <Icon
                name={icon}
                size={23}
                color={focused ? AppColors.primary : Colors.grey}
              />
            ),
          })}
        />
      ))}

      {Object.keys(user).length === 0 ? (
        <Drawer.Screen
          name="SignUp"
          component={AuthStackScreen}
          options={() => ({
            title: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: focused ? AppColors.primary : Colors.grey,
                  fontFamily: 'Roboto-Medium',
                }}
              >
                Đăng nhập
              </CustomText>
            ),
            drawerIcon: ({ focused }) => (
              <Icon
                name="login"
                size={23}
                color={focused ? AppColors.primary : Colors.grey}
              />
            ),
          })}
        />
      ) : (
        <>
          <Drawer.Screen
            name="TouchId"
            component={TouchIdScreen}
            options={() => ({
              title: ({ focused }) => (
                <CustomText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: focused ? AppColors.primary : Colors.grey,
                    fontFamily: 'Roboto-Medium',
                  }}
                >
                  Touch/Face ID
                </CustomText>
              ),
              drawerIcon: ({ focused }) => (
                <Icon
                  name="security"
                  size={25}
                  color={focused ? AppColors.primary : Colors.grey}
                />
              ),
            })}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={() => ({
              title: ({ focused }) => (
                <CustomText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: focused ? AppColors.primary : Colors.grey,
                    fontFamily: 'Roboto-Medium',
                  }}
                >
                  Thông Tin Cá Nhân
                </CustomText>
              ),
              drawerIcon: ({ focused }) => (
                <Icon
                  name="account"
                  size={25}
                  color={focused ? AppColors.primary : Colors.grey}
                />
              ),
            })}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};
