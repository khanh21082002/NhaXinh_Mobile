import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../../reducers';
import Colors from '../../utils/Colors';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {Portal, Provider} from 'react-native-paper';
import {Carousel, Header, FloatButton} from './components';
import Skeleton from '../../components/Loaders/SkeletonLoading';
import SearchBar from './components/SearchBar';
import Snackbar from '../../components/Notification/Snackbar';
import {fetchCategories} from '../../reducers/category/categoryActions';
import ProductItem from './components/ProductItem';
import {AppColors} from '../../styles';
import ModalComp from './components/ModalComp';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);

  // Lấy dữ liệu từ Redux
  const user = useSelector(state => state.auth.user);
  const products = useSelector(state => state.store.products);
  const categories = useSelector(state => state.category.categories);
  const isLoading = useSelector(state => state.store.isLoading);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [color, setColor] = useState(AppColors.primary);

  // Lấy danh sách sản phẩm và danh mục khi vào màn hình
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const checkColor = async () => {
      const getColor = await colorCheck(products.color);
      setColor(getColor);
    };
    checkColor();
  }, [products]);

  // Khi chọn danh mục, tìm kiếm sản phẩm
  const handleSelectCategory = category => {
    if (selectedCategory === category.name) return;
    setSelectedCategory(category.name);
  };

  const filteredProducts = useMemo(() => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    if (!selectedCategory) return sortedProducts.slice(0, 12);
    return sortedProducts.filter(
      product => product.categoryName === selectedCategory,
    );
  }, [selectedCategory, products]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Mở modal
  const handleOpenModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          {/* {showSnackbar && (
            <Snackbar checkVisible={showSnackbar} message={message} />
          )} */}
          {Object.keys(user).length === 0 ? null : (
            <Portal>
              <FloatButton />
            </Portal>
          )}

          <Header style={{marginHorizontal: 8}} user={user} products={products} navigation={navigation} />
          <View style={[styles.banner, {paddingTop: 70}]}>
            <Carousel />
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <SearchBar
              categories={categories}
              onSelectCategory={handleSelectCategory}
            />
          </View>

          <AnimatedFlatList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={styles.viewMoreButton}
                onPress={() => navigation.navigate('Product')}>
                <Text style={styles.viewMoreText}>Xem thêm</Text>
              </TouchableOpacity>
            )}
            scrollEventThrottle={1}
            onScroll={onScroll}
            data={filteredProducts}
            extraData={selectedCategory}
            keyExtractor={(item, index) =>
              item?.productId ? item.productId.toString() : `item-${index}`
            }
            renderItem={({item}) => (
              <ProductItem
                user={user}
                item={item}
                navigation={navigation}
                setModalVisible={() => handleOpenModal(item)}
                setMessage={setMessage}
                setShowSnackbar={setShowSnackbar}
              />
            )}
          />
          {selectedItem && (
            <ModalComp
              item={selectedItem}
              color={color}
              modalVisible={modalVisible}
              setModalVisible={handleCloseModal}
              navigation={navigation}
            />
          )}
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  banner: {
    marginBottom: 10,
  },
  list: {
    width: '100%',
    marginTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  viewMoreButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
